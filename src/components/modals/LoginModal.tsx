import { ChangeEvent, FC, useCallback, useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import TInput from "../TInput";
import TModal from "../TModal";
import useRegisterModal from "../../hooks/useRegister";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const LoginModal: FC = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await signIn("credentials", { email: email, password: password });
      // console.log("--- login res", res);
      // if (res?.ok) {
      //   loginModal.onClose();
      //   toast.success("Login success");
      // } else {
      //   throw new Error("Invalid credentials");
      // }
    } catch (error) {
      console.log("--- loing onSubmit error", error);
      toast.error("Invalid credentails");
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const onToggle = useCallback(() => {
    if (loading) return;
    registerModal.onOpen();
    loginModal.onClose();
  }, [loading, loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-5">
      <TInput
        placeholder="Email"
        value={email}
        disabled={loading}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          setEmail(e.target.value);
        }}
      />
      <TInput
        placeholder="Password"
        type="password"
        value={password}
        disabled={loading}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          setPassword(e.target.value);
        }}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter ?{" "}
        <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <TModal
      disabled={loading}
      open={loginModal.open}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
