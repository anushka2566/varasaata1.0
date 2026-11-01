import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { PRIVACY_POLICY_VERSION } from "@/lib/policies";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · VARASAATA" },
      {
        name: "description",
        content: "How the VARASAATA game collects, uses and protects your account and game data.",
      },
      { property: "og:title", content: "Privacy Policy · VARASAATA" },
      { property: "og:description", content: "How VARASAATA handles your data." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" version={PRIVACY_POLICY_VERSION}>
      <p>
        This policy explains what personal data the VARASAATA (వరసాట) game collects when you create
        an account and play, why, and your choices. VARASAATA is operated by Bonam Maruthi
        Anushka.
      </p>

      <h2>1. Data we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> your display name and email address provided at sign-up.
        </li>
        <li>
          <strong>Authentication data:</strong> your password is handled by the authentication
          provider and stored only as a secure hash. We do not see or store it in plain text.
          Authentication sessions are managed by the provider and kept in the app/browser as needed
          for sign-in continuity.
        </li>
        <li>
          <strong>Profile and preferences:</strong> avatar, player colours, board theme, sound
          setting, language preference and related game settings.
        </li>
        <li>
          <strong>Online multiplayer and social data:</strong> room codes, invitations, friends or
          player interaction data, room membership status, and the current state of online match
          sessions you participate in.
        </li>
        <li>
          <strong>Policy consent records:</strong> the versions of this Privacy Policy and the Terms
          you accepted, and when.
        </li>
        <li>
          <strong>Game statistics:</strong> match results, rounds won and lost, game mode, AI
          difficulty, timers used, scores, and timestamps.
        </li>
      </ul>
      <p>
        We do not directly collect payment data, contact lists, photos, or precise location data
        from your device for the game itself.
      </p>
      <p>
        <strong>Advertising (Android app).</strong> The Android app displays Google AdMob banners on
        the menu and interstitial ads after a completed match, never during active gameplay. AdMob
        may collect your device's advertising identifier, IP address, device information, and ad
        interactions to serve ads and measure performance. It may also use approximate location data
        derived from your IP address, where applicable. Ads are personalized only where required by
        the app's consent flow and relevant platform settings. The web version does not display ads.
        For details, see the{" "}
        <a
          className="text-primary underline"
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </a>{" "}
        and{" "}
        <a
          className="text-primary underline"
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          how Google uses data from partner sites and apps
        </a>
        .
      </p>

      <h2>2. Why we use it</h2>
      <ul>
        <li>To create and secure your account and keep you signed in.</li>
        <li>To remember your preferences and show your statistics.</li>
        <li>To support online multiplayer, room creation and invitations.</li>
        <li>To record that you accepted our policies before gameplay.</li>
        <li>To send account emails you request, such as sign-up or password-reset flows.</li>
      </ul>

      <h2>3. Services that process your data</h2>
      <p>
        Accounts, authentication, profile data, online multiplayer data, friends and game statistics
        are processed through Supabase. Data is transmitted over encrypted HTTPS connections. Fonts
        may be loaded from Google Fonts, which may receive your IP address when the page loads. The
        Android app also uses Google AdMob for advertising. We do not sell personal data. We may
        share data with service providers necessary to operate the app, such as Supabase and Google
        AdMob, as described in this policy and applicable platform terms.
      </p>

      <h2>4. Security</h2>
      <p>
        User profiles, consent records and statistics are stored in the app's database and protected
        by access controls. No system is perfectly secure; we cannot guarantee absolute security, but
        we take reasonable measures to protect the data we handle.
      </p>

      <h2>5. Retention</h2>
      <p>
        We keep account and game data while your account remains active and as needed to provide the
        service, including multiplayer, statistics, and consent records. When you request account
        deletion, we will remove or deactivate account-related data as reasonably possible, subject to
        any legal or operational requirements for backup retention, fraud prevention, or required
        records.
      </p>

      <h2>6. Account and data deletion</h2>
      <p>
        To request deletion of your account and associated data, email{" "}
        <a className="text-primary underline" href="mailto:maruthianushkabonam@gmail.com">
          maruthianushkabonam@gmail.com
        </a>{" "}
        from the address you registered with, with the subject "Delete my VARASAATA account". We
        will review and process the request as reasonably possible. You may also request a copy or
        correction of your data in the same way.
      </p>

      <h2>7. Children</h2>
      <p>
        VARASAATA is intended for a general audience. If you believe a child has provided personal
        data without appropriate permission, contact us and we will review the request.
      </p>

      <h2>8. Changes</h2>
      <p>
        If we change this policy we will update the version above and ask you to accept the new
        version before you continue playing.
      </p>

      <h2>9. Contact</h2>
      <p>
        Developer: Bonam Maruthi Anushka
        <br />
        Email: <a className="text-primary underline" href="mailto:maruthianushkabonam@gmail.com">
          maruthianushkabonam@gmail.com
        </a>
      </p>
    </LegalPage>
  );
}
