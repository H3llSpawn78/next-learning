"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];
type headerProps = {
  logo?: string;
  headingText?: string;
};

export default function Header({ logo, headingText }: headerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-gray-300">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {/* <div dangerouslySetInnerHTML={{ __html: logo || "" }} /> */}

            <svg
              width="139"
              height="45"
              viewBox="0 0 139 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M86.18 6.589C84.363 6.589 82.885 5.112 82.885 3.295C82.885 1.478 84.362 0 86.18 0C87.998 0 89.475 1.478 89.475 3.295C89.475 5.112 87.997 6.589 86.18 6.589ZM86.181 9.581C85.3474 9.58127 84.548 9.91245 83.9585 10.5018C83.369 11.0911 83.0375 11.8904 83.037 12.724V32.218C83.037 33.0519 83.3682 33.8517 83.9578 34.4415C84.5474 35.0313 85.3471 35.3627 86.181 35.363C87.0148 35.3625 87.8142 35.0309 88.4036 34.4411C88.9929 33.8514 89.324 33.0518 89.324 32.218V12.724C89.3235 11.8906 88.9922 11.0915 88.4029 10.5021C87.8135 9.91284 87.0144 9.58153 86.181 9.581ZM111.197 9.581C110.364 9.58153 109.564 9.91284 108.975 10.5021C108.386 11.0915 108.055 11.8906 108.054 12.724V24.252C107.92 26.358 107.14 30.376 103.166 30.376H103.16C99.186 30.376 98.409 26.358 98.272 24.252V12.724C98.2573 11.9 97.9197 11.1147 97.3317 10.5372C96.7438 9.95966 95.9526 9.63607 95.1285 9.63607C94.3044 9.63607 93.5132 9.95966 92.9253 10.5372C92.3373 11.1147 91.9997 11.9 91.985 12.724V22.804C91.985 29.3 94.902 32.427 97.754 33.94C100.485 35.387 103.159 35.362 103.159 35.362L103.163 35.358L103.165 35.362C103.165 35.362 105.842 35.387 108.569 33.94C111.424 32.426 114.339 29.299 114.339 22.804V12.724C114.339 12.3113 114.258 11.9025 114.1 11.5211C113.943 11.1398 113.711 10.7932 113.419 10.5013C113.128 10.2094 112.781 9.97791 112.4 9.82C112.018 9.66208 111.61 9.58087 111.197 9.581ZM21.83 9.581C20.9964 9.581 20.197 9.91214 19.6076 10.5016C19.0181 11.091 18.687 11.8904 18.687 12.724V13.812C17.139 12.003 14.362 9.581 10.573 9.581C4.524 9.581 0 15.041 0 21.756C0 28.471 3.048 35.362 10.43 35.362C14.728 35.362 17.291 33.057 18.687 30.606V32.218C18.687 33.0517 19.0181 33.8512 19.6075 34.4408C20.1969 35.0304 20.9963 35.3617 21.83 35.362C22.6637 35.3617 23.4631 35.0304 24.0525 34.4408C24.6419 33.8512 24.973 33.0517 24.973 32.218V12.724C24.9727 11.8905 24.6415 11.0912 24.0521 10.5019C23.4628 9.91249 22.6635 9.58127 21.83 9.581ZM18.668 22.484V22.709C18.668 24.185 17.715 30.805 12.334 30.805C6.954 30.805 6 24.519 6 22.709C6 20.899 6.571 14.041 12.143 14.041C17.715 14.041 18.668 19.661 18.668 22.471V22.484ZM69.646 9.581C65.826 9.581 63.038 12.041 61.496 13.855V12.724C61.4813 11.9 61.1437 11.1147 60.5557 10.5372C59.9678 9.95966 59.1766 9.63607 58.3525 9.63607C57.5284 9.63607 56.7372 9.95966 56.1493 10.5372C55.5613 11.1147 55.2237 11.9 55.209 12.724V41.711C55.2237 42.535 55.5613 43.3203 56.1493 43.8978C56.7372 44.4753 57.5284 44.7989 58.3525 44.7989C59.1766 44.7989 59.9678 44.4753 60.5557 43.8978C61.1437 43.3203 61.4813 42.535 61.496 41.711V30.542C62.886 33.016 65.455 35.361 69.788 35.361C77.17 35.361 80.219 28.47 80.219 21.756C80.219 15.042 75.693 9.581 69.646 9.581ZM67.883 30.805C62.501 30.805 61.549 24.185 61.549 22.709V22.471C61.549 19.661 62.501 14.041 68.074 14.041C73.645 14.041 74.218 20.899 74.218 22.709C74.218 24.519 73.266 30.805 67.883 30.805ZM42.171 9.581C38.352 9.581 35.563 12.041 34.021 13.855V12.724C34.021 11.8904 33.6899 11.091 33.1004 10.5016C32.511 9.91214 31.7116 9.581 30.878 9.581C30.0444 9.581 29.245 9.91214 28.6556 10.5016C28.0661 11.091 27.735 11.8904 27.735 12.724V41.711C27.7557 42.5308 28.0959 43.3102 28.6831 43.8827C29.2702 44.4553 30.0579 44.7757 30.878 44.7757C31.6981 44.7757 32.4858 44.4553 33.0729 43.8827C33.6601 43.3102 34.0003 42.5308 34.021 41.711V30.542C35.411 33.016 37.98 35.361 42.314 35.361C49.695 35.361 52.743 28.47 52.743 21.756C52.743 15.042 48.219 9.581 42.171 9.581ZM40.409 30.805C35.027 30.805 34.075 24.185 34.075 22.709V22.471C34.075 19.661 35.027 14.041 40.599 14.041C46.171 14.041 46.743 20.899 46.743 22.709C46.743 24.519 45.791 30.805 40.409 30.805ZM128.223 31.602C131.399 31.602 132.791 30.217 132.791 27.731C132.791 25.009 123.876 23.804 121.62 22.661C119.367 21.517 117.429 19.519 117.429 16.597C117.429 13.676 120.32 9.454 127.496 9.454C134.672 9.454 137.464 13.614 137.464 14.82C137.464 16.027 137.021 17.549 134.988 17.549C132.955 17.549 131.718 15.374 130.96 14.616C130.268 13.921 129.159 13.264 127.368 13.264C125.683 13.264 123.114 13.756 123.114 16.343C123.114 19.2 130.258 19.963 133.177 20.82C136.098 21.677 138.924 23.995 138.924 27.329C138.924 30.663 136.668 35.363 127.78 35.363C118.889 35.363 117.142 30.217 117.142 28.63C117.142 27.043 118.254 26.058 119.713 26.058C120.46 26.058 121.429 26.695 122.024 28.005C122.882 29.892 125.114 31.602 128.223 31.602Z"
                fill="#0E161B"
              />
            </svg>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm/6 font-semibold text-gray-500">
            Form example
          </a>
          <a href="/pokemon" className="text-sm/6 font-semibold text-gray-500">
            Pokemon
          </a>{" "}
          <a href="/repos" className="text-sm/6 font-semibold text-gray-500">
            Repos
          </a>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-500">
              Product
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-500"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-white/5"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-400 group-hover:text-gray-500"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-500"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-500 hover:bg-gray-700/50"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-500"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <h1 className="text-black text-2xl font-bold">{headingText}</h1>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-500 hover:bg-white/5">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-500 hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-white/5"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-white/5"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-white/5"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <h1 className="text-black text-2xl font-bold">{headingText}</h1>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
