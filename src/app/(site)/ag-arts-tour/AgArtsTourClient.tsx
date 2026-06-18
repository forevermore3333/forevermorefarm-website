'use client'

import Image from 'next/image'
import { useEffect } from 'react'

interface ConfirmedVendor {
  name: string
  cover: string
  profile: string
}

const confirmedVendors: ConfirmedVendor[] = [
  {
    name: 'Papa K Joe’s BBQ',
    cover: '/images/vendors/papa-kayjoes-bbq-cover.jpg',
    profile: '/images/vendors/papa-kayjoes-bbq-profile.jpg',
  },
  {
    name: 'Twin Creek Woodworks',
    cover: '/images/vendors/twin-creek-woodworks-cover.jpg',
    profile: '/images/vendors/twin-creek-woodworks-profile.jpg',
  },
  {
    name: 'Rustic Roots',
    cover: '/images/vendors/rustic-roots-homestead-cover.jpg',
    profile: '/images/vendors/rustic-roots-homestead-profile.jpg',
  },
  {
    name: 'The Old Country Church Stead',
    cover: '/images/vendors/the-old-country-churchstead-cover.jpg',
    profile: '/images/vendors/the-old-country-churchstead-profile.jpg',
  },
  {
    name: 'Candy Crochets',
    cover: '/images/vendors/candy-crochets.jpg',
    profile: '/images/vendors/candy-crochets.jpg',
  },
]

export default function AgArtsTourClient() {
  useEffect(() => {
    const vp = document.getElementById('mapvp')
    const cv = document.getElementById('mapcanvas')
    if (!vp || !cv) return

    let z = 1
    const zMin = 1
    const zMax = 6

    const apply = (nextZoom: number, fx?: number, fy?: number) => {
      const newZoom = Math.max(zMin, Math.min(zMax, nextZoom))
      if (newZoom === z) return
      const rect = vp.getBoundingClientRect()
      const focusX = fx ?? rect.width / 2
      const focusY = fy ?? rect.height / 2
      const oldW = vp.clientWidth * z
      const oldH = cv.offsetHeight
      const cx = (vp.scrollLeft + focusX) / oldW
      const cy = (vp.scrollTop + focusY) / Math.max(oldH, 1)
      z = newZoom
      cv.style.setProperty('--z', String(z))
      requestAnimationFrame(() => {
        const newW = vp.clientWidth * z
        const newH = cv.offsetHeight
        vp.scrollLeft = cx * newW - focusX
        vp.scrollTop = cy * newH - focusY
      })
    }

    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.ag-arts-page .zoomctl button'))
    const onButtonClick = (event: MouseEvent) => {
      event.preventDefault()
      const button = event.currentTarget as HTMLButtonElement
      const action = button.getAttribute('data-z')
      if (action === 'in') apply(z * 1.6)
      else if (action === 'out') apply(z / 1.6)
      else {
        z = 1
        cv.style.setProperty('--z', '1')
        vp.scrollLeft = 0
        vp.scrollTop = 0
      }
    }
    buttons.forEach((button) => button.addEventListener('click', onButtonClick))

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) return
      event.preventDefault()
      const rect = vp.getBoundingClientRect()
      apply(z * (event.deltaY < 0 ? 1.18 : 1 / 1.18), event.clientX - rect.left, event.clientY - rect.top)
    }
    vp.addEventListener('wheel', onWheel, { passive: false })

    const onDoubleClick = (event: MouseEvent) => {
      const rect = vp.getBoundingClientRect()
      apply(z * 1.8, event.clientX - rect.left, event.clientY - rect.top)
    }
    vp.addEventListener('dblclick', onDoubleClick)

    let down = false
    let moved = false
    let sx = 0
    let sy = 0
    let sl = 0
    let st = 0

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      down = true
      moved = false
      sx = event.clientX
      sy = event.clientY
      sl = vp.scrollLeft
      st = vp.scrollTop
      vp.classList.add('grabbing')
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!down) return
      const dx = event.clientX - sx
      const dy = event.clientY - sy
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true
      vp.scrollLeft = sl - dx
      vp.scrollTop = st - dy
    }
    const onPointerUp = () => {
      if (!down) return
      down = false
      vp.classList.remove('grabbing')
    }
    const onCanvasClick = (event: MouseEvent) => {
      if (!moved) return
      event.preventDefault()
      event.stopPropagation()
      moved = false
    }

    vp.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    cv.addEventListener('click', onCanvasClick, true)

    return () => {
      buttons.forEach((button) => button.removeEventListener('click', onButtonClick))
      vp.removeEventListener('wheel', onWheel)
      vp.removeEventListener('dblclick', onDoubleClick)
      vp.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      cv.removeEventListener('click', onCanvasClick, true)
    }
  }, [])

  return (
    <div className="ag-arts-page">
      <style>{agArtsStyles}</style>

      <header className="hero">
        <div>
          <div className="script">Forevermore Farm</div>
          <div className="sub">Hickman County Ag &amp; Arts Tour &nbsp;•&nbsp; Farms ★ Art ★ Music ★ Backroads</div>
          <div className="dates">Friday &amp; Saturday • June 19–20, 2026 • 10 AM – 5 PM</div>
          <p className="free">A free, self-guided tour of farms, art &amp; music across Tennessee backroads</p>
          <p className="official">For a full list of the other farms and tour info, see the official website for details → <a href="https://www.agandartstour.com/" target="_blank" rel="noopener noreferrer">agandartstour.com</a></p>
        </div>
      </header>

      <nav className="stopnav" aria-label="Ag & Arts Tour page navigation">
        <a href="#map" className="maplink">Map</a>
        <a href="#forevermore" className="maplink">Forevermore Farm</a>
        <a href="#ag-arts-vendors" className="maplink">Vendors</a>
      </nav>

      <section id="map" className="wrap">
        <h1 className="sec">Plan Your Route</h1>
        <div className="secline" />
        <div className="maps">
          <div className="mapwrap">
            <div className="zoomctl" aria-hidden="false">
              <button type="button" data-z="in" aria-label="Zoom in">+</button>
              <button type="button" data-z="out" aria-label="Zoom out">−</button>
              <button type="button" data-z="reset" aria-label="Reset zoom">⟲</button>
            </div>
            <div className="mapviewport" id="mapvp">
              <div className="mapcanvas" id="mapcanvas">
                <img src="/ag-arts-tour/tour-map.jpg" alt="Hickman County Ag & Arts Tour map showing Forevermore Farm in Lyles, Tennessee" />
                <a className="pin pin-forevermore" href="#forevermore" style={{ left: '65.7%', top: '33.4%' }} aria-label="Jump to Forevermore Farm" />
              </div>
            </div>
          </div>
        </div>
        <p className="mapnote">On a phone, drag to pan and pinch or use the +/- controls to zoom in for a closer look. Map location is approximate — use the Directions button below for exact navigation.</p>
      </section>

      <section className="wrap" id="stops">
        <h2 className="sec">Forevermore Farm</h2>
        <div className="secline" />

        <div className="grid single-stop">
          <article className="card" id="forevermore" data-tags="animals food shop">
            <div className="imgwrap">
              <img loading="lazy" decoding="async" src="/ag-arts-tour/forevermore-farm.jpg" alt="Forevermore Farm" data-id="f58162" />
              <span className="food">Food: Papa KayJoe&apos;s BBQ</span>
            </div>
            <h3>Forevermore Farm</h3>
            <div className="chips">
              <span className="chip">Animal Husbandry</span>
              <span className="chip">Straw Bale Gardens</span>
            </div>
            <p className="desc">
              An off-grid homestead rooted in sustainability, family, and long-view stewardship — solar powered, with every garden row and structure connected to living simply and intentionally.
              <span className="more"> From thriving straw bale gardens and sweeping sunflower fields to hands-on demonstrations and free-roaming animals, you&apos;ll leave with a sense that this kind of life is possible, practical, and worth pursuing.</span>
            </p>
            <button
              type="button"
              className="readmore"
              onClick={(event) => {
                const button = event.currentTarget
                const desc = button.previousElementSibling
                desc?.classList.toggle('open')
                button.textContent = desc?.classList.contains('open') ? 'show less' : 'read more...'
              }}
            >
              read more...
            </button>
            <p className="vendors"><b>Guest Vendors</b> — The Old Country Churchstead • Rustic Roots Homestead • Twin Creek Woodworks • Candy Crochet</p>
            <div className="amen">Restrooms • Gravel Parking • Cash &amp; Venmo</div>
            <div className="actions">
              <a className="btn dir" href="https://www.google.com/maps/dir/?api=1&destination=302+Hickory+Trace,+Lyles,+TN" target="_blank" rel="noopener noreferrer">Get Directions</a>
              <a className="btn web" href="https://forevermorefarmtn.com" target="_blank" rel="noopener noreferrer">Visit Website ↗</a>
            </div>
          </article>
        </div>
      </section>

      <VendorSection />
    </div>
  )
}

function VendorSection() {
  return (
    <section id="ag-arts-vendors" className="bg-farm-cream px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-farm-tan">Vendors + Flea Market Under The Tent</span>
          <h2 className="mt-3 font-serif text-3xl text-farm-green md:text-4xl">Confirmed so far.</h2>
          <p className="mt-4 text-lg leading-relaxed text-farm-charcoal/70">
            These are the confirmed names so far for the Ag &amp; Arts Tour weekend at Forevermore Farm. More vendors are still being finalized.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {confirmedVendors.map((vendor) => (
            <div key={vendor.name} className="overflow-hidden rounded-sm border border-farm-tan/25 bg-white shadow-sm">
              <div className="relative aspect-[16/9]">
                <Image
                  src={vendor.cover}
                  alt={`${vendor.name} vendor image`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative p-6 pt-10">
                <div className="absolute left-6 top-0 h-16 w-16 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white shadow-md">
                  <Image
                    src={vendor.profile}
                    alt={`${vendor.name} profile image`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-farm-tan">Confirmed vendor</p>
                <p className="mt-2 font-serif text-2xl text-farm-green">{vendor.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-farm-charcoal/60">Confirmed for the Ag &amp; Arts Tour weekend.</p>
              </div>
            </div>
          ))}
          <div className="rounded-sm border border-dashed border-farm-green/30 bg-farm-green/5 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-farm-green/60">Still coming together</p>
            <p className="mt-3 font-serif text-2xl text-farm-green">Plus other vendors still being finalized</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const agArtsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Kaushan+Script&family=Oswald:wght@500;600&display=swap');

  .ag-arts-page{
    --paper:#f4ecd9; --paper2:#efe3c8; --red:#9e2f2f; --navy:#22395c;
    --gold:#d9a833; --ink:#2e2a24; --card:#faf5e8;
    background:var(--paper);color:var(--ink);font-family:'EB Garamond',Georgia,serif;line-height:1.55;
  }
  .ag-arts-page *{box-sizing:border-box}
  .ag-arts-page .wrap{max-width:1200px;margin:0 auto;padding:0 16px}
  .ag-arts-page .hero{background:linear-gradient(rgba(34,57,92,.25),rgba(34,57,92,.45)),url('https://static.wixstatic.com/media/cfc394_da3a820e23204d2a920613d2d146cdc2~mv2.png/v1/fill/w_1600,h_700,al_c,q_80/bg.jpg') center/cover;text-align:center;padding:64px 16px 56px;border-bottom:6px double var(--gold)}
  .ag-arts-page .hero .script{font-family:'Kaushan Script',cursive;font-size:clamp(2.6rem,6vw,4.5rem);color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.55)}
  .ag-arts-page .hero .sub{font-family:'Oswald',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#ffe9b0;font-size:clamp(.85rem,2vw,1.05rem);margin-top:10px;text-shadow:0 1px 6px rgba(0,0,0,.6)}
  .ag-arts-page .hero .dates{display:inline-block;margin-top:18px;background:var(--red);color:#fff;font-family:'Oswald',sans-serif;letter-spacing:.08em;padding:10px 26px;border-radius:4px;font-size:1.05rem;box-shadow:0 3px 10px rgba(0,0,0,.35)}
  .ag-arts-page .hero p.free{color:#fff;margin-top:12px;font-style:italic;font-size:1.05rem;text-shadow:0 1px 6px rgba(0,0,0,.7)}
  .ag-arts-page .hero p.official{color:#fff;margin:10px auto 0;max-width:720px;font-size:.98rem;line-height:1.5;text-shadow:0 1px 7px rgba(0,0,0,.75)}
  .ag-arts-page .hero p.official a{color:#ffe9b0;font-weight:700;text-decoration:underline;text-underline-offset:3px}
  .ag-arts-page .stopnav{position:sticky;top:0;z-index:40;background:var(--navy);box-shadow:0 2px 8px rgba(0,0,0,.25);padding:10px 8px;text-align:center}
  .ag-arts-page .stopnav a{display:inline-block;width:34px;height:34px;line-height:34px;margin:3px;border-radius:50%;background:#33507e;color:#fff;font-family:'Oswald',sans-serif;font-size:.95rem;text-decoration:none;transition:.15s}
  .ag-arts-page .stopnav a:hover{background:var(--gold);color:var(--navy)}
  .ag-arts-page .stopnav a.maplink{width:auto;border-radius:18px;padding:0 14px;background:var(--red)}
  .ag-arts-page .stopnav a.maplink:hover{background:var(--gold);color:var(--navy)}
  .ag-arts-page h1.sec,.ag-arts-page h2.sec{font-family:'Oswald',sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--red);text-align:center;font-size:clamp(1.5rem,3.5vw,2.2rem);margin:48px 0 8px;font-weight:600}
  .ag-arts-page .secline{width:140px;height:3px;background:var(--gold);margin:0 auto 28px;position:relative}
  .ag-arts-page .secline:after{content:'★';position:absolute;top:-13px;left:50%;transform:translateX(-50%);color:var(--gold);background:var(--paper);padding:0 8px}
  .ag-arts-page .maps{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
  .ag-arts-page .mapnote{text-align:center;font-style:italic;margin-top:12px;color:#6b6253}
  .ag-arts-page .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:22px;margin-bottom:40px}
  .ag-arts-page .grid.single-stop{max-width:760px;margin-left:auto;margin-right:auto}
  .ag-arts-page .card{background:var(--card);border:1px solid #d9c9a3;border-radius:6px;overflow:hidden;box-shadow:0 3px 12px rgba(70,50,20,.12);display:flex;flex-direction:column;scroll-margin-top:70px}
  .ag-arts-page .card .imgwrap{position:relative;height:auto;overflow:visible;line-height:0}
  .ag-arts-page .card .imgwrap img{width:100%;height:auto;object-fit:fill;display:block}
  .ag-arts-page .badge,.ag-arts-page .food{display:none}
  .ag-arts-page .card h3{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
  .ag-arts-page .chips{padding:10px 18px 4px}
  .ag-arts-page .chip{display:inline-block;background:var(--navy);color:#fff;font-family:'Oswald',sans-serif;font-size:.72rem;letter-spacing:.05em;padding:4px 11px;border-radius:13px;margin:0 5px 6px 0}
  .ag-arts-page .desc{padding:8px 18px 4px;font-size:1.02rem}
  .ag-arts-page .desc .more{display:none}
  .ag-arts-page .desc.open .more{display:inline}
  .ag-arts-page .readmore{background:none;border:none;color:var(--red);font-family:'EB Garamond',serif;font-size:1rem;font-style:italic;cursor:pointer;padding:0 18px 6px;text-align:left}
  .ag-arts-page .vendors{padding:6px 18px;font-size:.97rem}
  .ag-arts-page .vendors b{font-family:'Kaushan Script',cursive;color:var(--red);font-weight:400;font-size:1.08rem}
  .ag-arts-page .amen{margin-top:auto;background:var(--navy);color:#f3e9d2;padding:10px 18px;font-size:.88rem;font-family:'Oswald',sans-serif;letter-spacing:.03em;font-weight:300}
  .ag-arts-page .hidden{display:none!important}
  .ag-arts-page .mapwrap{position:relative;width:min(960px,94vw)}
  .ag-arts-page .mapviewport{position:relative;overflow:auto;border:6px solid #fff;border-radius:3px;background:var(--paper);box-shadow:0 4px 14px rgba(0,0,0,.18);-webkit-overflow-scrolling:touch;cursor:grab}
  .ag-arts-page .mapviewport.grabbing{cursor:grabbing}
  .ag-arts-page .mapcanvas{position:relative;width:calc(var(--z,1)*100%);line-height:0;transition:width .16s ease}
  .ag-arts-page .mapcanvas img{width:100%;display:block;border:0;-webkit-user-drag:none;user-select:none}
  .ag-arts-page .pin{position:absolute;transform:translate(-50%,-50%);width:3.2%;aspect-ratio:1;border-radius:50%;text-indent:-200vw;overflow:hidden;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;animation:agArtsPinPulse 1.9s ease 3}
  .ag-arts-page .pin::after{content:'';position:absolute;inset:0;border-radius:50%;background:rgba(217,168,51,.95);box-shadow:0 0 0 3px #22395c,0 2px 8px rgba(0,0,0,.35);transition:box-shadow .15s}
  .ag-arts-page .pin-forevermore{z-index:8;width:6.4%;display:flex;align-items:center;justify-content:center;overflow:visible;text-indent:0;color:#fff;font-family:'Oswald',sans-serif;font-size:clamp(.8rem,1.8vw,1.35rem);font-weight:600;letter-spacing:.02em;text-decoration:none;text-shadow:0 1px 2px rgba(0,0,0,.55);animation:agArtsFeaturedPulse 2.2s ease 4}
  .ag-arts-page .pin-forevermore::after{inset:-6%;background:var(--gold);box-shadow:0 0 0 3px #fff,0 0 0 8px rgba(217,168,51,.5),0 0 26px rgba(217,168,51,.9),0 3px 12px rgba(0,0,0,.38)}
  .ag-arts-page .pin-forevermore::before{content:'Forevermore Farm';position:absolute;left:50%;top:calc(100% + 7px);transform:translateX(-50%);background:rgba(34,57,92,.96);color:#fff;border-radius:999px;padding:4px 9px;font-size:clamp(.55rem,1.1vw,.82rem);font-family:'Oswald',sans-serif;letter-spacing:.04em;text-transform:uppercase;line-height:1;box-shadow:0 2px 8px rgba(0,0,0,.28)}
  .ag-arts-page .pin:hover::after,.ag-arts-page .pin:focus-visible::after{box-shadow:0 0 0 4px rgba(217,168,51,.95)}
  .ag-arts-page .pin:focus-visible{outline:none}
  @keyframes agArtsPinPulse{0%,100%{box-shadow:0 0 0 0 rgba(158,47,47,0)}50%{box-shadow:0 0 0 .5vw rgba(158,47,47,.5)}}
  @keyframes agArtsFeaturedPulse{0%,100%{filter:drop-shadow(0 0 0 rgba(217,168,51,0))}50%{filter:drop-shadow(0 0 12px rgba(217,168,51,.9))}}
  @media (prefers-reduced-motion:reduce){.ag-arts-page .pin{animation:none}}
  .ag-arts-page .zoomctl{position:absolute;top:14px;right:14px;z-index:20;display:flex;flex-direction:column;gap:6px}
  .ag-arts-page .zoomctl button{width:38px;height:38px;border:none;border-radius:8px;background:rgba(34,57,92,.92);color:#fff;font-family:'Oswald',sans-serif;font-size:1.3rem;line-height:1;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center}
  .ag-arts-page .zoomctl button:hover{background:var(--red)}
  .ag-arts-page .zoomctl button:active{transform:translateY(1px)}
  .ag-arts-page .actions{display:flex;flex-wrap:wrap;gap:9px;padding:14px 18px 4px;margin-top:auto}
  .ag-arts-page .btn{flex:1 1 130px;text-align:center;font-family:'Oswald',sans-serif;letter-spacing:.04em;text-transform:uppercase;font-size:.82rem;padding:11px 14px;border-radius:9px;text-decoration:none;transition:.15s}
  .ag-arts-page .btn.dir{background:var(--navy);color:#fff}
  .ag-arts-page .btn.dir:hover{background:#16263f}
  .ag-arts-page .btn.web{background:var(--gold);color:var(--navy)}
  .ag-arts-page .btn.web:hover{background:#c4952a}
  .ag-arts-page .card:target{animation:agArtsCardFlash 1.8s ease 1}
  @keyframes agArtsCardFlash{0%,40%{box-shadow:0 0 0 3px var(--gold),0 3px 12px rgba(70,50,20,.22)}100%{box-shadow:0 3px 12px rgba(70,50,20,.12)}}
  @media (max-width:740px){.ag-arts-page .mapviewport{max-height:74vh;touch-action:pan-x pan-y}.ag-arts-page .pin{width:5%}}
  @media (min-width:741px){.ag-arts-page .zoomctl{opacity:.55;transition:opacity .2s}.ag-arts-page .mapwrap:hover .zoomctl{opacity:1}}
`
