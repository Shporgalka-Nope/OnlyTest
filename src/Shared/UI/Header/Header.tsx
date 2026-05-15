"use client";
import { useAppSelector } from "@/state/useStoreHooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggle,
} from "react-bootstrap";

export default function Header() {
  const accessToken = useAppSelector((state) => state.user.AccessToken);
  const router = useRouter();

  useEffect(() => {
    if (accessToken === null) {
      router.push("/auth");
    }
  }, [accessToken]);

  return (
    <div>
      <Navbar expand="md" className="bg-primary" data-bs-theme="dark">
        <Container>
          <NavbarBrand>Бренд</NavbarBrand>
          {/* <NavbarText>{user.Username}</NavbarText> */}
          <NavbarToggle />
        </Container>
      </Navbar>
    </div>
  );
}
