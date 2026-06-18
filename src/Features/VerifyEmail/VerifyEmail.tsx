import { Button, Form } from "react-bootstrap";
import { useDMSFContext } from "../DynamicMultiStepForm/libs/useDMSFContext";
import { apiAutogen } from "@/state/apiAutogen";
import { useEffect } from "react";

export default function VerifyEmail() {
  const { onStepFinish, readData } = useDMSFContext();
  const userEmail = readData?.["email"];
  const [triggerSendEmail] =
    apiAutogen.endpoints.getEmailSendEmailVerificationLetter.useLazyQuery();

  useEffect(() => {
    if ((readData?.["isEmailVerified"] as boolean) === true) {
      onStepFinish();
    }
  }, [readData, onStepFinish]);

  const handleClick = () => {
    triggerSendEmail({ userEmail: userEmail });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Подтвердите свою электронную почту</h1>
      <p className="lead">
        Данное действие обязательно для продолжения работы с системой.
      </p>

      <small className="text-body-secondary">
        После нажатия на кнопку ниже на вашу электронную почту будет направленно
        письмо с ссылкой для подтверждения.
      </small>

      <br />
      <div className="align-self-start">
        <small className="text-body-secondary">
          <Form.Group>
            <Form.Label>Эл. Почта связанная с аккаунтом:</Form.Label>
            <Form.Control
              disabled
              value={userEmail ?? undefined}
            ></Form.Control>
            <Form.Text className="text-muted">
              Не забудьте проверить папку "Спам"
            </Form.Text>
            <br />
            <Button onClick={handleClick} className="my-2">
              Отправить
            </Button>
          </Form.Group>
        </small>
      </div>
    </div>
  );
}
