"use client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/stores/auth/session.store";
import { useOTPStore } from "@/stores/otp/otp.store";
import { generateOTP } from "@/lib/otp.util";
import { useState } from "react";
import { RefreshCwIcon } from "lucide-react";

const ActionSendEmail = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const { setOTP } = useOTPStore();
  const { user } = useSessionStore();

  const sendEmail = async () => {
    setLoading(true);
    const newOPT = generateOTP();
    setOTP(newOPT);

    // console.log(otp, "newOPT", newOPT);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          username: user.name,
          email: user.email,
          code: newOPT,
        }),
      });
      if (!res.ok) {
        const json = await res.json();
        if (json.error) {
          const error = new Error(json.error) as Error & {
            status: number;
          };
          error.status = res.status;
          throw error;
        } else {
          throw new Error("An unexpected error occurred");
        }
      }

      const data = await res.json();
      // console.log("DATA", data);
      toast({
        title: data.message,
        description: `Revise su bandeja de entrada (${user.email}). Entonces, introduzca el código enviado en el campo y presione el botón Firmar.`,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al enviar email",
        description:
          "Hubo un problema al enviar el correo. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // <Button variant={"outline"} size={"default"} onClick={() => sendEmail()}>
    <span>
      {loading ? (
        <Button disabled variant={"outline"} size={"default"}>
          <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
          Por favor espere
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size={"default"}
          disabled={loading}
          onClick={sendEmail}
        >
          Enviar Código
        </Button>
      )}
    </span>
  );
};

export default ActionSendEmail;
