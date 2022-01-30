import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useWeb3Context } from "../EthProvider";
import style from "../../styles/header.module.css";

const Header = () => {
  const ctx = useWeb3Context();
  return (
    <Container className={style.container}>
      <Row>
        <Col className={style.title}>
          <h1>Welcome grimmarian.</h1>
        </Col>
        <Col className={style.wallet}>
          {ctx.account ? (
            <Button
              style={{ borderRadius: 0, padding: 10 }}
              variant="outline-light"
            >
              Connect
            </Button>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
export default Header;
