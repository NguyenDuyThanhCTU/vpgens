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
import Header from "@components/layout/Header";
import Copyright from "@components/layout/Copyright";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Config: Array<any> = await find("Config", true);
  const Accounts: AccountProps[] = await find("Accounts", true);
  const ProductCategory: CategoryProps[] = await find("ProductCategory", true);
  const PostCategory: CategoryProps[] = await find("PostCategory", true);
  const Products = await find("Products", true);

  return (
    <html lang="en">
      <StateProvider Config={Config}>
        <UserProvider Accounts={Accounts} Products={Products}>
          <body className="font-LexendDeca font-light">
            <Header
              Products={Products}
              Accounts={Accounts}
              ProductCategory={ProductCategory}
              PostCategory={PostCategory}
            />

            <main className="d:mt-[112px] p:mt-[91px]  d:text-[16px] p:text-[13px] ">
              {children}
            </main>
            <Copyright
              Products={Products}
              Config={Config}
              ProductCategory={ProductCategory}
              PostCategory={PostCategory}
            />
          </body>
        </UserProvider>
      </StateProvider>
    </html>
  );
}
