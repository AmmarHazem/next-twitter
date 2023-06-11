import { ChangeEvent, FC, useCallback, useState } from "react";
import TInput from "../TInput";
import TModal from "../TModal";
import useRegisterModal from "../../hooks/useRegister";
import useLoginModal from "../../hooks/useLoginModal";
import axios from "axios";
import { signIn } from "next-auth/react";
import { UserModel } from "../../models";
import toast from "react-hot-toast";

const RegisterModal: FC = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post<UserModel>("/api/register", {
        email: email,
        username: userName,
        name: name,
        password: password,
      });
      const newUser = res.data;
      if (newUser) {
        toast.success("Account created");
        signIn("credentials", { email, password });
        registerModal.onClose();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("--- loing onSubmit error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [email, name, password, registerModal, userName]);

  const onToggle = useCallback(() => {
    if (loading) return;
    registerModal.onClose();
    loginModal.onOpen();
  }, [loading, loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-5">
      <TInput
        placeholder="Name"
        value={name}
        disabled={loading}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          setName(e.target.value);
        }}
      />
      <TInput
        placeholder="User Name"
        value={userName}
        disabled={loading}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          setUserName(e.target.value);
        }}
      />
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
        Already have an account ?{" "}
        <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <TModal
      disabled={loading}
      open={registerModal.open}
      title="Create an account"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
