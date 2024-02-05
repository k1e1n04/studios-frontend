import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomDrawer } from "@/organisms/NoAuthRequired/Top/CustomDrawer";
import { useState } from "react";
import Image from "next/image";
import { views } from "@/constants/views";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useRecoilState} from "recoil";
import {isThrottledAtom} from "@/states/isThrottledAtom";
import {Button} from "@mantine/core";
type Props = {
  children: React.ReactNode;
};

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export const NoAuthLayout: React.FC<Props> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThrottled, setIsThrottled] = useRecoilState(isThrottledAtom);
  return (
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
      <Dialog open={isThrottled}>
        <DialogTitle>リクエストが混み合っています</DialogTitle>
        <DialogContent>
          <DialogContentText>
            時間をおいて再度お試しください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsThrottled(false)}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
