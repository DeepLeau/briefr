import Link from 'next/link'

const footerLinks = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Developers',
    links: ['Docs', 'API Reference', 'CLI', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-accent flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">B</span>
              </div>
              <span className="text-sm font-semibold text-zinc-100">Briefr</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              The AI copilot that turns endless threads into actionable briefs.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-medium text-zinc-400 mb-3 uppercase tracking-wider">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
          <p className="text-xs text-zinc-600">© 2025 Briefr Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
