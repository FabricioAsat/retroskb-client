import { Outlet } from "react-router";
import { Header } from "../components";

export const Default = () => {
  return (
    <>
      <header className="flex justify-center items-center border-b-2 border-neutral-300">
        <Header />
      </header>
      <main className="overflow-y-auto h-full">
        <section className="h-full max-w-[1440px] w-full mx-auto">
          <Outlet />
        </section>
        <footer className="">Footer</footer>
      </main>
    </>
  );
};
