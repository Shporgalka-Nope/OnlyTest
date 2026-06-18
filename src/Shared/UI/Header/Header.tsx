"use client";
import { logout } from "@/Features/AuthForm/libs/userStateSlice";
import { apiAutogen, useGetUserLogoutQuery } from "@/state/apiAutogen";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Container, Navbar, NavbarBrand } from "react-bootstrap";

export default function Header() {
  const accessToken = useAppSelector((state) => state.local.user.AccessToken);
  const user = useAppSelector((state) => state.local.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutUser, { isFetching }] =
    apiAutogen.endpoints.getUserLogout.useLazyQuery();

  const HandleExit = async () => {
    await logoutUser();
    dispatch(logout());
    router.push("/");
  };

  useEffect(() => {
    if (accessToken === null) {
      router.push("/auth");
    }
  }, [accessToken]);

  return (
    <div>
      <Navbar expand="md" className="bg-primary" data-bs-theme="dark">
        <Container className="d-flex align-items-center">
          <h6 className="text-white">OnlyTest</h6>
          <div>
            {user.Username && (
              <>
                <Navbar.Text>{user.Username}</Navbar.Text>
                <Button
                  variant="link"
                  disabled={isFetching}
                  onClick={HandleExit}
                >
                  Выйти
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
