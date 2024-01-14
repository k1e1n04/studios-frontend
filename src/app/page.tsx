"use client";
import {NoAuthLayout} from "@/templates/NoAuthLayout";

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
  return (
    <NoAuthLayout>
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
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
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
                  href="/study/list"
                  className="rounded-md bg-primary-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#558BA8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#659CBA]"
              >
                サインアップ
              </a>
            </div>
          </div>
        </div>
      </div>
    </NoAuthLayout>
  );
}
