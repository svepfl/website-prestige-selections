import { useTranslations } from 'next-intl';

export default function ImpressumPage() {
  const t = useTranslations('impressum');

  return (
    <section className="bg-dark pt-32 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-12">
          {t('title')}
        </h1>

        <div className="prose-invert space-y-10 text-neutral-300 text-sm leading-relaxed">
          {/* Angaben gemäß § 5 TMG */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              Angaben gem&auml;&szlig; &sect; 5 TMG
            </h2>
            <p>
              Prestige GmbH<br />
              Engesserstra&szlig;e 1<br />
              79108 Freiburg
            </p>
            <p className="mt-4">
              Telefon: +49 761 5573168<br />
              E-Mail: info@prestige-selections.com<br />
              Web: www.prestige-selections.com
            </p>
          </div>

          {/* Handelsregister */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">Handelsregister</h2>
            <p>
              Registergericht: Amtsgericht Freiburg im Breisgau<br />
              Registernummer: HRB 708798
            </p>
          </div>

          {/* Geschäftsführer */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              Gesch&auml;ftsf&uuml;hrer
            </h2>
            <p>J&eacute;r&ocirc;me Gay</p>
          </div>

          {/* Umsatzsteuer */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27a
              Umsatzsteuergesetz:<br />
              DE285102565
            </p>
          </div>

          {/* Inhaltlich Verantwortlich */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">
              Inhaltlich Verantwortlicher gem&auml;&szlig; &sect; 55 Abs. 2 RSt&apos;V
            </h2>
            <p>
              J&eacute;r&ocirc;me Gay<br />
              Engesserstra&szlig;e 1<br />
              79108 Freiburg
            </p>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h2 className="text-xl font-light text-white mb-6">Haftungsausschluss</h2>

            <h3 className="text-base font-light text-white mb-3">1. Inhalt des Onlineangebots</h3>
            <p className="mb-6">
              Die Prestige GmbH &uuml;bernimmt keinerlei Gew&auml;hr f&uuml;r die
              Aktualit&auml;t, Korrektheit, Vollst&auml;ndigkeit oder Qualit&auml;t der
              bereitgestellten Informationen. Haftungsanspr&uuml;che gegen die Prestige
              GmbH, welche sich auf Sch&auml;den materieller oder ideeller Art beziehen,
              die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw.
              durch die Nutzung fehlerhafter und unvollst&auml;ndiger Informationen
              verursacht wurden, sind grunds&auml;tzlich ausgeschlossen, sofern seitens
              der Prestige GmbH kein nachweislich vors&auml;tzliches oder grob
              fahrl&auml;ssiges Verschulden vorliegt.
            </p>

            <h3 className="text-base font-light text-white mb-3">2. Verweise und Links</h3>
            <p className="mb-6">
              Bei direkten oder indirekten Verweisen auf fremde Webseiten
              (&quot;Hyperlinks&quot;), die au&szlig;erhalb des Verantwortungsbereiches
              der Prestige GmbH liegen, w&uuml;rde eine Haftungsverpflichtung
              ausschlie&szlig;lich in dem Fall in Kraft treten, in dem die Prestige GmbH
              von den Inhalten Kenntnis hat und es ihr technisch m&ouml;glich und zumutbar
              w&auml;re, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Die
              Prestige GmbH erkl&auml;rt hiermit ausdr&uuml;cklich, dass zum Zeitpunkt
              der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten
              erkennbar waren. Auf die aktuelle und zuk&uuml;nftige Gestaltung, die
              Inhalte oder die Urheberschaft der verlinkten/verkn&uuml;pften Seiten hat
              die Prestige GmbH keinerlei Einfluss. Deshalb distanziert sie sich hiermit
              ausdr&uuml;cklich von allen Inhalten aller verlinkten/verkn&uuml;pften
              Seiten, die nach der Linksetzung ver&auml;ndert wurden.
            </p>

            <h3 className="text-base font-light text-white mb-3">3. Urheber- und Kennzeichenrecht</h3>
            <p className="mb-6">
              Die Prestige GmbH ist bestrebt, in allen Publikationen die Urheberrechte der
              verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu
              beachten, von ihr selbst erstellte Bilder, Grafiken, Tondokumente,
              Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken,
              Tondokumente, Videosequenzen und Texte zur&uuml;ckzugreifen. Alle innerhalb
              des Internetangebotes genannten und ggf. durch Dritte gesch&uuml;tzten
              Marken- und Warenzeichen unterliegen uneingeschr&auml;nkt den Bestimmungen
              des jeweils g&uuml;ltigen Kennzeichenrechts und den Besitzrechten der
              jeweiligen eingetragenen Eigent&uuml;mer. Allein aufgrund der blo&szlig;en
              Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch
              Rechte Dritter gesch&uuml;tzt sind.
            </p>

            <h3 className="text-base font-light text-white mb-3">4. Datenschutz</h3>
            <p className="mb-6">
              Sofern innerhalb des Internetangebotes die M&ouml;glichkeit zur Eingabe
              pers&ouml;nlicher oder gesch&auml;ftlicher Daten (E-Mail-Adressen, Namen,
              Anschriften) besteht, so erfolgt die Preisgabe dieser Daten seitens des
              Nutzers auf ausdr&uuml;cklich freiwilliger Basis. Die Inanspruchnahme und
              Bezahlung aller angebotenen Dienste ist &mdash; soweit technisch
              m&ouml;glich und zumutbar &mdash; auch ohne Angabe solcher Daten bzw. unter
              Angabe anonymisierter Daten oder eines Pseudonyms gestattet.
            </p>

            <h3 className="text-base font-light text-white mb-3">
              5. Rechtswirksamkeit dieses Haftungsausschlusses
            </h3>
            <p className="mb-6">
              Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten,
              von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne
              Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder
              nicht vollst&auml;ndig entsprechen sollten, bleiben die &uuml;brigen Teile
              des Dokumentes in ihrem Inhalt und ihrer G&uuml;ltigkeit davon
              unber&uuml;hrt.
            </p>
          </div>

          {/* Gleichstellungshinweis */}
          <div>
            <h2 className="text-lg font-light text-white mb-4">Gleichstellungshinweis</h2>
            <p>
              Aus Gr&uuml;nden der besseren Lesbarkeit wird bei Personenbezeichnungen und
              personenbezogenen Hauptw&ouml;rtern auf dieser Website die m&auml;nnliche
              Form verwendet. Entsprechende Begriffe gelten im Sinne der
              Gleichbehandlung grunds&auml;tzlich f&uuml;r alle Geschlechter. Die
              verk&uuml;rzte Sprachform hat nur redaktionelle Gr&uuml;nde und
              beinhaltet keine Wertung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
