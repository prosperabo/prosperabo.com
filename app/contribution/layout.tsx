export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="z-10 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-accent from-0% via-slate-950 via-50% to-accent to-100% py-2 pb-32 max-md:max-w-full">
      <h1 className="mt-14 px-12 pb-12 pt-12 text-center text-5xl font-light text-white max-md:mt-10 max-md:text-4xl">
        MI PERFIL
      </h1>
      {children}
    </section>
  );
}
