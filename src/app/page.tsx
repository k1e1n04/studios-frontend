"use client";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomDrawer } from "@/organisms/NoAuthRequired/Top/CustomDrawer";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

/**
 * トップページ
 * @constructor
 */
export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="./favicon.ico" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/auth/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              ログイン <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <CustomDrawer
          navigation={navigation}
          open={mobileMenuOpen}
          setOpen={setMobileMenuOpen}
        />
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#81C7D4] to-[#B2EBF2] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Studyo
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Studyoは、日々の学びを「Study」として記録し、創造性を育む「Studio」の役割を担います。
              学習の一歩一歩を記録することで、自分自身の成長を実感し、新たな可能性に挑戦する勇気を与えてくれます。
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/auth/signup"
                className="rounded-md bg-primary-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#558BA8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#659CBA]"
              >
                サインアップ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
