import Link from "next/link";
import { OnionScene } from "@/components/site/onion-scene";
import { ArrowUpRight, ArrowDown, Globe2, Layers3, MousePointer2 } from "lucide-react";

export default function Home() {
  return (
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="intro-line"><span className="small-dot" />Independent software studio</p>
          <h1 id="hero-title">Good software.<br />Human roots.</h1>
          <p className="hero-description">We turn a little “what if” into websites, apps and software that make everyday life a little easier.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">Let’s make something <ArrowUpRight size={20} /></Link>
            <a className="text-link" href="#work">Explore our work <ArrowDown size={17} /></a>
          </div>
          <p className="hero-footnote">Small studio. Thoughtful work. Plenty of layers.</p>
        </div>
        <OnionScene />
      </section>

      <div className="studio-strip">
        <div className="wrap">
          <span>Thoughtfully designed</span>
          <span className="strip-flower" aria-hidden="true">✳</span>
          <span>Built to be used</span>
          <span className="strip-flower" aria-hidden="true">✳</span>
          <span>Room to grow</span>
          <span className="strip-flower" aria-hidden="true">✳</span>
          <span>A human on the other end</span>
        </div>
      </div>

      <section id="work" className="work-section wrap section-space">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Made by Piwas</p>
            <h2>Ideas out in the wild.</h2>
          </div>
          <p>Our own products, built and cared for.<br />Real software for real everyday things.</p>
        </div>
        <div className="product-grid">
          <Link href="/products/sofrapiwas" className="product-card sofra-card">
            <div className="product-stage sofra-stage">
              <div className="product-stage-top">
                <span>SofraPiwas</span>
                <span className="status-label"><span />Live product</span>
              </div>
              <div className="order-preview" aria-hidden="true">
                <div className="order-top"><span>At your service.</span><span>sofra</span></div>
                <div className="order-columns">
                  <div>
                    <span className="preview-label">On the table</span>
                    <strong>A smoother<br />service.</strong>
                    <span className="order-tag">Menu · Orders · Reservations</span>
                  </div>
                  <div className="order-ticket">
                    <span>Table 04</span>
                    <hr />
                    <p>2 × Falafel wrap</p>
                    <p>1 × Homemade lemonade</p>
                    <span className="ticket-status">Ready for the kitchen</span>
                  </div>
                </div>
              </div>
              <span className="preview-caption">A little glimpse of what it does</span>
            </div>
            <div className="product-info">
              <div><h3>SofraPiwas</h3><p>More hospitality. Less juggling.</p></div>
              <span className="circle-link"><ArrowUpRight size={24} /></span>
            </div>
            <p className="product-description">Menus, orders, reservations and loyalty. One connected restaurant platform, from the guest’s table to the kitchen.</p>
          </Link>

          <Link href="/products/domainio" className="product-card domain-card">
            <div className="product-stage domain-stage">
              <div className="product-stage-top">
                <span>Domainio</span>
                <span className="status-label"><span />Live product</span>
              </div>
              <div className="domain-preview" aria-hidden="true">
                <span>Your next idea starts here.</span>
                <strong>Make a name<br />for yourself.</strong>
                <div className="domain-search">
                  <span>your-big-idea.nl</span>
                  <span><ArrowUpRight size={22} /></span>
                </div>
                <div className="domain-tlds"><span>.nl</span><span>.com</span><span>.studio</span><span>.you</span></div>
              </div>
              <span className="preview-caption">Domain names, with a human touch</span>
            </div>
            <div className="product-info">
              <div><h3>Domainio</h3><p>A home for your next idea.</p></div>
              <span className="circle-link"><ArrowUpRight size={24} /></span>
            </div>
            <p className="product-description">Find, register and manage your domains. A straightforward starting point for people and the things they’re building.</p>
          </Link>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="wrap section-space">
          <div className="section-heading">
            <div>
              <p className="section-kicker">What we can make together</p>
              <h2>From first thought<br />to “it’s live”.</h2>
            </div>
            <p>Something new, something better,<br />or something that finally just works.</p>
          </div>
          <div className="services-grid">
            <article>
              <Globe2 size={32} strokeWidth={1.4} />
              <h3>Websites with character</h3>
              <p>A place that feels like your business. Clear, quick and easy to use, on every screen.</p>
              <span>Company sites · Portfolios · Web shops</span>
            </article>
            <article>
              <Layers3 size={32} strokeWidth={1.4} />
              <h3>Software that fits</h3>
              <p>Your process shouldn’t bend around your tools. Let’s build an app that works the way you do.</p>
              <span>SaaS products · Web &amp; mobile apps</span>
            </article>
            <article>
              <MousePointer2 size={32} strokeWidth={1.4} />
              <h3>All the pieces, connected</h3>
              <p>Give the repetitive work to software. Connect your systems and keep things running smoothly.</p>
              <span>Integrations · Automation · Ongoing care</span>
            </article>
          </div>
          <div className="hero-actions">
            <Link className="text-link" href="/services">How a project goes <ArrowUpRight size={18} /></Link>
            <Link className="text-link" href="/contact">Tell us what you have in mind <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section id="about" className="about-section wrap section-space">
        <div className="about-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/onion-mark.svg" width="150" height="170" alt="Piwas onion mark" />
          <span>piwas / onion / پیواز</span>
        </div>
        <div>
          <p className="section-kicker">A small studio with roots</p>
          <h2>Yes, it means onion.</h2>
          <p>Piwas is the Kurdish word for onion. A simple, everyday thing with a surprising amount going on underneath. That feels like a good way to think about software.</p>
          <p>Started by Mahmut Kaya in the Netherlands, Piwas brings design and development together. We build our own products and help other people bring theirs to life.</p>
          <p>No big-agency ceremony. Just a direct conversation, thoughtful decisions and care for the details.</p>
        </div>
      </section>

      <section className="contact-band">
        <div className="wrap">
          <p>Got a little “what if”?</p>
          <div>
            <h2>Let’s see what grows.</h2>
            <Link href="/contact" className="button button-light">Say hello <ArrowUpRight size={20} /></Link>
          </div>
          <span>A rough idea is a perfectly good place to start.</span>
        </div>
      </section>
    </main>
  );
}
