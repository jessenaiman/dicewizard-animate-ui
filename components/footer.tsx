export const Footer = () => {
  return (
    <div className="h-14">
      <div className="absolute bottom-0 left-0 right-0 h-[55px] border-t">
        <div className="size-full px-4 md:px-6 flex items-center justify-end prose prose-sm text-sm text-muted-foreground">
          <p className="text-start truncate">
            Built by{' '}
            <a
              href="https://x.com/elliot_stn"
              rel="noopener noreferrer"
              target="_blank"
            >
              Skyleen
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/Skyleen77/animate-ui"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
