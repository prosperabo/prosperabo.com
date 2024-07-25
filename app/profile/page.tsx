"use client";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/auth/user/user.store";
import { fetchUpsert } from "@/lib/data/profile";
import type { ProfileRequest } from "@/lib/definitions";

const ProfilePage = () => {
  const { user } = useUserStore();
  const router = useRouter();

  // SCOPE: handleSubmit
  const handlerSubmitForm = async (personalForm: any) => {
    console.log("handlerSubmitForm", personalForm);
    if (!user?.id) {
      throw toast({
        title: "Error: Usuario inválido",
        description:
          "Recargue la página por favor. Si continua, inténtalo de nuevo más tarde",
        variant: "destructive",
      });
    }

    const payload: ProfileRequest = {
      gender: personalForm.gender,
      address: personalForm.address,
      birthdate: personalForm.birthDate,
      frontIdDocumentFile: personalForm.frontIdentityFile,
      reverseIdDocumentFile: personalForm.reverseIdentityFile,
      userId: user.id,
    };
    try {
      // const profile = await postData(payloadData);
      const profile = await fetchUpsert(payload);
      console.log("profile", profile);

      toast({
        title: "¡Guardado!",
        description: `${profile?.createdAt}`,
        variant: "success",
      });
      router.push("/profile/work");
      // redirect("/profile/work");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al registrar la información",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" z-20 flex flex-col justify-center">
      <PersonalInfoForm onSubmit={handlerSubmitForm} />
    </div>
  );
};

export default ProfilePage;
