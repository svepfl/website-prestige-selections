import { useTranslations } from 'next-intl';

export default function DatenschutzPage() {
  const t = useTranslations('datenschutz');

  return (
    <section className="bg-dark pt-32 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-12">
          {t('title')}
        </h1>

        <div className="prose-invert space-y-10 text-neutral-300 text-sm leading-relaxed">
          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und
              anderer nationaler Datenschutzgesetze sowie sonstiger
              datenschutzrechtlicher Bestimmungen ist:
            </p>
            <p className="mt-4">
              Prestige GmbH<br />
              Engesserstra&szlig;e 1<br />
              79108 Freiburg<br />
              Telefon: +49 761 5573168<br />
              E-Mail: info@prestige-selections.com<br />
              Gesch&auml;ftsf&uuml;hrer: J&eacute;r&ocirc;me Gay
            </p>
          </div>

          {/* 2. Erhebung und Speicherung */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck
              von deren Verwendung
            </h2>

            <h3 className="text-base font-light text-white mb-3 mt-6">
              a) Beim Besuch der Website
            </h3>
            <p>
              Beim Aufrufen unserer Website werden durch den auf Ihrem Endger&auml;t
              zum Einsatz kommenden Browser automatisch Informationen an den Server
              unserer Website gesendet. Diese Informationen werden tempor&auml;r in
              einem sogenannten Logfile gespeichert. Folgende Informationen werden dabei
              ohne Ihr Zutun erfasst und bis zur automatisierten L&ouml;schung
              gespeichert:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>IP-Adresse des anfragenden Rechners</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
              <li>
                Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie
                der Name Ihres Access-Providers
              </li>
            </ul>
            <p className="mt-4">
              Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                Gew&auml;hrleistung eines reibungslosen Verbindungsaufbaus der Website
              </li>
              <li>Gew&auml;hrleistung einer komfortablen Nutzung unserer Website</li>
              <li>Auswertung der Systemsicherheit und -stabilit&auml;t</li>
              <li>Zu weiteren administrativen Zwecken</li>
            </ul>
            <p className="mt-4">
              Die Rechtsgrundlage f&uuml;r die Datenverarbeitung ist Art. 6 Abs. 1 S. 1
              lit. f DSGVO. Unser berechtigtes Interesse folgt aus den oben aufgelisteten
              Zwecken zur Datenerhebung.
            </p>

            <h3 className="text-base font-light text-white mb-3 mt-6">
              b) Bei Nutzung unseres Kontaktformulars
            </h3>
            <p>
              Bei Fragen jeglicher Art bieten wir Ihnen die M&ouml;glichkeit, mit uns
              &uuml;ber ein auf der Website bereitgestelltes Formular Kontakt
              aufzunehmen. Dabei ist die Angabe einer g&uuml;ltigen E-Mail-Adresse
              sowie Ihres Namens erforderlich, damit wir wissen, von wem die Anfrage
              stammt und um diese beantworten zu k&ouml;nnen. Weitere Angaben
              k&ouml;nnen freiwillig get&auml;tigt werden.
            </p>
            <p className="mt-4">
              Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach
              Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten
              Einwilligung. Die f&uuml;r die Benutzung des Kontaktformulars von uns
              erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen
              gestellten Anfrage automatisch gel&ouml;scht.
            </p>
          </div>

          {/* 3. Cookies */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              3. Cookies
            </h2>
            <p>
              Wir setzen auf unserer Website Cookies ein. Hierbei handelt es sich um
              kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem
              Endger&auml;t gespeichert werden, wenn Sie unsere Website besuchen.
            </p>
            <p className="mt-4">
              Wir verwenden folgende Arten von Cookies:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <strong className="text-white">Notwendige Cookies:</strong> Cookies, die
                f&uuml;r den Betrieb der Website zwingend erforderlich sind (z. B.
                Spracheinstellungen, Cookie-Einwilligung).
              </li>
              <li>
                <strong className="text-white">Analyse-Cookies:</strong> Cookies, die uns
                helfen, die Nutzung unserer Website zu analysieren und zu verbessern.
                Diese werden erst nach Ihrer ausdr&uuml;cklichen Einwilligung gesetzt.
              </li>
              <li>
                <strong className="text-white">Marketing-Cookies:</strong> Cookies, die
                f&uuml;r die Ausspielung personalisierter Werbung verwendet werden.
                Diese werden erst nach Ihrer ausdr&uuml;cklichen Einwilligung gesetzt.
              </li>
            </ul>
            <p className="mt-4">
              Sie k&ouml;nnen Ihre Cookie-Einstellungen jederzeit &uuml;ber unseren
              Cookie-Banner anpassen oder in Ihren Browser-Einstellungen Cookies
              deaktivieren.
            </p>
          </div>

          {/* 4. Tracking */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              4. Webanalyse und Tracking
            </h2>
            <p>
              Wir verwenden auf unserer Website den Google Tag Manager (GTM), der
              &uuml;ber einen serverseitigen Container bei Stape.io betrieben wird. Der
              serverseitige GTM-Container fungiert als Proxy zwischen Ihrer Website und
              den Analysediensten, wodurch Ihre Daten nicht direkt an Drittanbieter
              gesendet werden, sondern zun&auml;chst an unseren eigenen Server
              &uuml;bermittelt und dort verarbeitet werden.
            </p>
            <p className="mt-4">
              Dies bietet folgende Vorteile:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Erh&ouml;hter Datenschutz durch serverseitige Verarbeitung</li>
              <li>
                Reduzierung der an Drittanbieter weitergegebenen Daten auf das notwendige
                Minimum
              </li>
              <li>
                Bessere Kontrolle &uuml;ber die Datenverarbeitung
              </li>
            </ul>

            <h3 className="text-base font-light text-white mb-3 mt-6">
              Google Analytics
            </h3>
            <p>
              Wir nutzen Google Analytics 4 (GA4) &uuml;ber den serverseitigen
              GTM-Container. Google Analytics verwendet Cookies, um eine Analyse der
              Benutzung der Website zu erm&ouml;glichen. Die durch das Cookie erzeugten
              Informationen &uuml;ber Ihre Benutzung dieser Website werden zun&auml;chst
              an unseren serverseitigen Container &uuml;bermittelt und von dort in
              anonymisierter Form an einen Server von Google in der EU &uuml;bertragen.
            </p>
            <p className="mt-4">
              Google Analytics wird nur aktiviert, wenn Sie Ihre Einwilligung &uuml;ber
              unseren Cookie-Banner erteilt haben (Art. 6 Abs. 1 S. 1 lit. a DSGVO). Wir
              setzen Google Consent Mode v2 ein, um Ihre Einwilligungsentscheidung an
              Google zu &uuml;bermitteln.
            </p>
          </div>

          {/* 5. Google Consent Mode v2 */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              5. Google Consent Mode v2
            </h2>
            <p>
              Wir verwenden den Google Consent Mode v2, um Ihre
              Einwilligungsentscheidungen an Google-Dienste zu &uuml;bermitteln. Dabei
              werden folgende Zustimmungssignale verarbeitet:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <strong className="text-white">analytics_storage:</strong> Steuert, ob
                Analyse-Cookies gesetzt werden d&uuml;rfen.
              </li>
              <li>
                <strong className="text-white">ad_storage:</strong> Steuert, ob
                Marketing-/Werbe-Cookies gesetzt werden d&uuml;rfen.
              </li>
              <li>
                <strong className="text-white">ad_user_data:</strong> Steuert, ob
                Nutzerdaten an Google f&uuml;r Werbezwecke &uuml;bermittelt werden
                d&uuml;rfen.
              </li>
              <li>
                <strong className="text-white">ad_personalization:</strong> Steuert, ob
                personalisierte Werbung angezeigt werden darf.
              </li>
            </ul>
            <p className="mt-4">
              Ohne Ihre Einwilligung werden alle Signale standardm&auml;&szlig;ig auf
              &quot;denied&quot; (abgelehnt) gesetzt.
            </p>
          </div>

          {/* 6. Rechte */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              6. Rechte der betroffenen Person
            </h2>
            <p>Sie haben das Recht:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                gem&auml;&szlig; Art. 15 DSGVO Auskunft &uuml;ber Ihre von uns
                verarbeiteten personenbezogenen Daten zu verlangen;
              </li>
              <li>
                gem&auml;&szlig; Art. 16 DSGVO unverz&uuml;glich die Berichtigung
                unrichtiger oder Vervollst&auml;ndigung Ihrer bei uns gespeicherten
                personenbezogenen Daten zu verlangen;
              </li>
              <li>
                gem&auml;&szlig; Art. 17 DSGVO die L&ouml;schung Ihrer bei uns
                gespeicherten personenbezogenen Daten zu verlangen;
              </li>
              <li>
                gem&auml;&szlig; Art. 18 DSGVO die Einschr&auml;nkung der Verarbeitung
                Ihrer personenbezogenen Daten zu verlangen;
              </li>
              <li>
                gem&auml;&szlig; Art. 20 DSGVO Ihre personenbezogenen Daten in einem
                strukturierten, g&auml;ngigen und maschinenlesbaren Format zu erhalten
                oder die &Uuml;bermittlung an einen anderen Verantwortlichen zu
                verlangen;
              </li>
              <li>
                gem&auml;&szlig; Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung
                jederzeit gegen&uuml;ber uns zu widerrufen;
              </li>
              <li>
                gem&auml;&szlig; Art. 77 DSGVO sich bei einer Aufsichtsbeh&ouml;rde zu
                beschweren.
              </li>
            </ul>
            <p className="mt-4">
              Zust&auml;ndige Aufsichtsbeh&ouml;rde: Der Landesbeauftragte f&uuml;r den
              Datenschutz und die Informationsfreiheit Baden-W&uuml;rttemberg.
            </p>
          </div>

          {/* 7. SSL */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              7. SSL-Verschl&uuml;sselung
            </h2>
            <p>
              Diese Website nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
              &Uuml;bertragung vertraulicher Inhalte eine SSL-Verschl&uuml;sselung. Eine
              verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des
              Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an
              dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </div>

          {/* 8. Aktualität */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              8. Aktualit&auml;t und &Auml;nderung dieser Datenschutzerkl&auml;rung
            </h2>
            <p>
              Diese Datenschutzerkl&auml;rung ist aktuell g&uuml;ltig und hat den Stand
              M&auml;rz 2026. Durch die Weiterentwicklung unserer Website und Angebote
              dar&uuml;ber oder aufgrund ge&auml;nderter gesetzlicher beziehungsweise
              beh&ouml;rdlicher Vorgaben kann es notwendig werden, diese
              Datenschutzerkl&auml;rung zu &auml;ndern.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
