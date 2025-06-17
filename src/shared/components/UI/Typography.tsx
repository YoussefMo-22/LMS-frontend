export const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-4xl  font-bold text-primary-400">{children}</h2>
);

export const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-primary-400 font-semibold text-3xl">{children}</h4>
);
export const SubText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-primary-400 text-xl">{children}</p>
);