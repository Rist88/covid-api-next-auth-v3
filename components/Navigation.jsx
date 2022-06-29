import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../AppContext";

export default function Navigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const value = useContext(AppContext);
  let { languageSelected } = value.state;
  let { navbarAboutLink, navbarContactLink } = value.state.languages;

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Link href="/">
          <a className="navbar-brand">Next Context API</a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responseve-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!session && (
              <>
                <span className="nav-link">You are not signed in</span>
                <Link
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  <a className="nav-link">Sign in</a>
                </Link>
              </>
            )}
            {session?.user && (
              <>
                {/* {session.user.image && (
                  <span
                    // style={{ backgroundImage: `url('${session.user.image}')` }}
                    className={styles.avatar}
                  />
                )} */}
                <span>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>
                <Link
                  href={`/api/auth/signout`}
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  <a className="nav-link">Sign out</a>
                </Link>
              </>
            )}
            <Link href="/about">
              <a className="nav-link">{navbarAboutLink}</a>
            </Link>
            <Link href="/contact">
              <a className="nav-link">{navbarContactLink}</a>
            </Link>
            <NavDropdown
              title={languageSelected.toUpperCase()}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => value.setLanguageSelected("en")}>
                English
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => value.setLanguageSelected("es")}>
                Spanish
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
