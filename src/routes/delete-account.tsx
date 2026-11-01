import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY_POLICY_VERSION } from "@/lib/policies";

export const Route = createFileRoute("/delete-account")({
  head: () => ({
    meta: [
      { title: "Delete Account · VARASAATA" },
      {
        name: "description",
        content: "How to delete your VARASAATA account and account data from the game.",
      },
      { property: "og:title", content: "Delete Account · VARASAATA" },
      { property: "og:description", content: "Delete your VARASAATA account and associated data." },
    ],
  }),
  component: DeleteAccountPage,
});

function DeleteAccountPage() {
  return (
    <LegalPage title="Delete Account" version={PRIVACY_POLICY_VERSION}>
      <p>
        If you want to remove your VARASAATA (వరసాట) account, use the Delete Account option in the
        in-game Settings screen. This is the recommended and most secure way to request deletion of
        your account and related game data.
      </p>

      <h2>1. How to delete your account</h2>
      <ol>
        <li>Open the VARASAATA game and go to the Settings tab.</li>
        <li>Select <strong>Delete Account</strong>.</li>
        <li>Review the confirmation message and confirm the action.</li>
        <li>You will be signed out after the deletion request is processed.</li>
      </ol>
      <p>
        Account deletion is permanent and should be treated as final. The account cannot be recovered
        once the deletion completes successfully.
      </p>

      <h2>2. What data is deleted</h2>
      <p>
        Deleting your account removes or clears the personal account data associated with your
        VARASAATA profile, including profile preferences, policy consent records, saved match
        statistics, and multiplayer-related records linked to your account.
      </p>
      <ul>
        <li>Profile information such as display name, username, avatar, and preferences.</li>
        <li>Game statistics and match history linked to your account.</li>
        <li>Online room invitations and room records associated with your account.</li>
        <li>Supabase Auth account and stored login session data for that account.</li>
      </ul>

      <h2>3. What may remain</h2>
      <p>
        Some data may be retained only where required for security, fraud prevention, legal
        compliance, backups, or for records that cannot be safely removed without affecting other
        users or service integrity. We do not keep your password in plain text, and account deletion
        does not create a separate recoverable profile.
      </p>

      <h2>4. Contact</h2>
      <p>
        Developer: Bonam Maruthi Anushka
        <br />
        Email: <a className="text-primary underline" href="mailto:maruthianushkabonam@gmail.com">
          maruthianushkabonam@gmail.com
        </a>
      </p>

      <h2>5. Related policies</h2>
      <p>
        For more information, review our <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
