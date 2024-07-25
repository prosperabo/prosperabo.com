import * as React from "react";

interface EmailTemplateProps {
  username: string;
  code: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  code,
}) => (
  <div>
    <h1>Hola, {username}!</h1>
    <p> Su código de verificación es: {code}</p>
  </div>
);
