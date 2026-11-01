import { createClient } from "npm:@supabase/supabase-js@2.49.10";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json(405, { success: false, error: "Method not allowed." });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return json(401, {
      success: false,
      error: "Authentication required. Please sign in again and try again.",
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, {
      success: false,
      error: "The account deletion service is not configured. Add the Supabase service role secret.",
    });
  }

  const jwt = authHeader.replace("Bearer ", "").trim();
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  try {
    const { data: userData, error: userError } = await adminClient.auth.getUser(jwt);
    if (userError || !userData.user) {
      return json(401, {
        success: false,
        error: "Your session is expired or invalid. Please sign in again.",
      });
    }

    const userId = userData.user.id;

    const deleteStep = async (label: string, fn: () => Promise<{ error: { message: string } | null }>) => {
      const result = await fn();
      if (result.error) {
        throw new Error(`${label}: ${result.error.message}`);
      }
    };

    await deleteStep("Deleting policy consent records", () =>
      adminClient.from("policy_consents").delete().eq("user_id", userId),
    );

    await deleteStep("Deleting match statistics", () =>
      adminClient.from("game_stats").delete().eq("user_id", userId),
    );

    await deleteStep("Deleting outgoing and incoming invitations", () =>
      adminClient
        .from("game_invitations")
        .delete()
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`),
    );

    await deleteStep("Deleting room records linked to the account", () =>
      adminClient.from("online_rooms").delete().or(`host_id.eq.${userId},guest_id.eq.${userId}`),
    );

    await deleteStep("Deleting the user profile", () =>
      adminClient.from("profiles").delete().eq("user_id", userId),
    );

    const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(userId);
    if (authDeleteError) {
      throw new Error(`Auth account deletion failed: ${authDeleteError.message}`);
    }

    const { data: remainingProfile, error: verifyError } = await adminClient
      .from("profiles")
      .select("user_id")
      .eq("user_id", userId)
      .limit(1);

    if (verifyError) {
      throw new Error(`Profile verification failed: ${verifyError.message}`);
    }

    if ((remainingProfile?.length ?? 0) > 0) {
      throw new Error("Account cleanup is incomplete: profile still exists after deletion.");
    }

    return json(200, {
      success: true,
      message: "Account deletion completed successfully.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown server error.";
    return json(500, {
      success: false,
      error: message,
    });
  }
});
