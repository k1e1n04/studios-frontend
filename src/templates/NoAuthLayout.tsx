import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomDrawer } from "@/organisms/NoAuthRequired/Top/CustomDrawer";
import { useState } from "react";
import Image from "next/image";
import { views } from "@/constants/views";
import { MantineProvider } from "@mantine/core";
import { createTheme as mantineCreateTheme } from "@mantine/core";
import ThemeRegistry from "@/registry";
type Props = {
  children: React.ReactNode;
};

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const mantineTheme = mantineCreateTheme({
  colors: {
    primary: [
      "#659CBA",
      "#507C94",
      "#F5F5F5",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    delete: [
      "#F06060",
      "#D64C4C",
      "#C03838",
      "#A62424",
      "#8E1010",
      "#7A0000",
      "#660000",
      "#520000",
      "#3E0000",
      "#2A0000",
    ],
  },
});

export const NoAuthLayout: React.FC<Props> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <MantineProvider theme={mantineTheme}>
      <ThemeRegistry>
        <div className="bg-white min-h-screen">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <Image src="/favicon.ico" width={32} height={32} alt="" />
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
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
                  href={views.AUTH_LOGIN.path}
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
          {children}
        </div>
      </ThemeRegistry>
    </MantineProvider>
  );
};
