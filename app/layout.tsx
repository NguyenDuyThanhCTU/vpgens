import "@styles/styles.css";
import "@styles/CKGlobal.css";
import "@styles/animation.css";

import { find } from "@config/lib/api";
import "animate.css";
import "animate.css/animate.compat.css";
import { StateProvider } from "@context/StateProvider";
import { AccountProps } from "@assets/props/PropsAccount";
import { CategoryProps } from "@assets/props/Props";
import { UserProvider } from "@context/UserProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Config: Array<any> = await find("Config");
  const Accounts: AccountProps[] = await find("Accounts", true);
  const ProductCategory: CategoryProps[] = await find("ProductCategory");
  const PostCategory: CategoryProps[] = await find("PostCategory");
  const Products = await find("Products");

  return (
    <html lang="en">
      <StateProvider Config={Config}>
        <UserProvider Accounts={Accounts} Products={Products}>
          <body className="font-LexendDeca font-light">
            <main className="d:mt-[112px] p:mt-[91px]  d:text-[16px] p:text-[13px] ">
              {children}
            </main>
          </body>
        </UserProvider>
      </StateProvider>
    </html>
  );
}
