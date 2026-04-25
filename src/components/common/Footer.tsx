export default function Footer({ translations, metadata }: { translations: any, metadata: any }) {
  return (
    <footer className="py-12 bg-text-primary text-background-main/80 border-t border-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-serif text-primary mb-4">{metadata.coupleNames}</h2>
        <p className="text-sm tracking-widest uppercase mb-8">{metadata.weddingDate}</p>
        
        <div className="w-24 h-[1px] bg-primary/20 mx-auto mb-8" />
        
        <p className="text-sm font-sans">
          {translations.footer.copyright.split('Event Macha').map((part: string, i: number, arr: any[]) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <a href="https://www.eventmacha.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4A857] hover:underline hover:text-white transition-colors">
                  Event Macha
                </a>
              )}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
