const page = () => {
  // const url = "https://docs.google.com/document/d/e/2PACX-1vSTjs7XuaTE8jUC21N1UvzGvKLdeZun1uIYPoXkv2zvQEMJ1N3pAmczsPbRIRW5w-0FDjllltZyLwVC/pub?embedded=true";
  const url = '/ProsperaPrivacy.pdf'

  return (
    <div className="z-10 w-full p-8 text-white ">
      <section className="flex h-screen items-center justify-center">
        <iframe
          src={url}
          width="80%"
          aria-controls="Términos y Condiciones"
          title="Términos y Condiciones"
          className="h-screen border-0"
        ></iframe>
      </section>
    </div>
  );
};

export default page;
