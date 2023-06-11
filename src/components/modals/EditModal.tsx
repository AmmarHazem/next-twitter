import { FC, useCallback, useEffect, useState } from "react";
import TModal from "../TModal";
import useCurrentUser from "../../hooks/useCurrentUser";
import useUser from "../../hooks/useUser";
import useEditModal from "../../hooks/useEditModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserModel } from "../../models";
import TInput from "../TInput";
import ImageUpload from "../ImageUpload";

const EditModal: FC = () => {
  const { data: currentUserData } = useCurrentUser();
  const { mutate: mutateCurrentUser } = useUser({ userName: currentUserData?.userName });
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState<string | undefined>(currentUserData?.profileImage);
  const [coverImage, setCoverImage] = useState<string | undefined>(currentUserData?.coverImage);
  const [name, setName] = useState<string>(currentUserData?.name ?? "");
  const [userName, setUserName] = useState<string>(currentUserData?.userName ?? "");
  const [bio, setBio] = useState<string>(currentUserData?.bio ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(currentUserData?.name ?? "");
    setUserName(currentUserData?.userName ?? "");
    setBio(currentUserData?.bio ?? "");
    setCoverImage(currentUserData?.coverImage);
    setProfileImage(currentUserData?.profileImage);
  }, [
    currentUserData?.bio,
    currentUserData?.coverImage,
    currentUserData?.name,
    currentUserData?.profileImage,
    currentUserData?.userName,
  ]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.patch<UserModel>("/api/edit", { name, userName, bio, profileImage, coverImage });
      if (res.data.id) {
        mutateCurrentUser();
        toast.success("Profile updated successfully");
        editModal.onClose();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("--- edit modal onSubmit error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [bio, coverImage, editModal, mutateCurrentUser, name, profileImage, userName]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        disabled={loading}
        value={profileImage}
        onChange={(img) => {
          setProfileImage(img);
        }}
        label="Upload profile image"
      />
      <ImageUpload
        disabled={loading}
        value={coverImage}
        onChange={(img) => {
          setCoverImage(img);
        }}
        label="Upload cover image"
      />
      <TInput placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={loading} />
      <TInput placeholder="User Name" onChange={(e) => setUserName(e.target.value)} value={userName} disabled={loading} />
      <TInput placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio} disabled={loading} />
    </div>
  );

  return (
    <TModal
      title="Edit your profile"
      actionLabel="Save"
      open={editModal.open}
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
