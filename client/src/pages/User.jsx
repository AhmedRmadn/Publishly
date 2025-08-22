import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import ArticleCard from "../components/ArticleCard";
import ImageCropperModal from "../components/ImageCropperModal";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";
import { useUpdateCoverImage } from "../hooks/useUpdateCoverImage";
import { useLoaderData, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUserProfile } from "../hooks/useUserProfile"; // adjust path

export default function UserPage() {
  const queryClient = useQueryClient();
  const { user: initialUser, articles } = useLoaderData();
  const [user, setUser] = useState(initialUser);
  const [avatarError, setAvatarError] = useState(false);
  const [coverError, setCoverError] = useState(false);
  // const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  // const [coverUrl, setCoverUrl] = useState(user.coverUrl);

  const [cropModal, setCropModal] = useState(null); // { src, aspect, onComplete }

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const { profileLoading, isError, user: currentAuthUser } = useUserProfile();

  const params = useParams();
  const currentUserName = params.userName;

  const isOwnProfile =
    !!currentAuthUser && currentAuthUser.username === currentUserName;

  const { updateProfileImage, updatingProfile, errorProfile } =
    useUpdateProfileImage();
  const { updateCoverImage, updatingCover, errorCover } = useUpdateCoverImage();

  // Generic image size validator
  const validateImageSize = (file, minWidth, minHeight) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width >= minWidth && img.height >= minHeight) {
          resolve(true);
        } else {
          reject(`Image must be at least ${minWidth}×${minHeight}px`);
        }
      };
      img.onerror = () => reject("Invalid image file");
      img.src = URL.createObjectURL(file);
    });
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await validateImageSize(file, 200, 200);
      const url = URL.createObjectURL(file);
      setCropModal({
        src: url,
        aspect: 1,
        onComplete: async (croppedBlob) => {
          const updatedUser = await updateProfileImage(croppedBlob); // return new user object
          setUser((prev) => ({
            ...prev,
            profile_image_url: updatedUser.profile_image_url,
          }));
          setCropModal(null);
        },
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCoverChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      await validateImageSize(file, 1280, 720);
      const url = URL.createObjectURL(file);
      setCropModal({
        src: url,
        aspect: 1060 / 175,
        onComplete: async (croppedBlob) => {
          const updatedUser = await updateCoverImage(croppedBlob);
          setUser((prev) => ({
            ...prev,
            cover_image_url: updatedUser.cover_image_url,
          }));
          setCropModal(null);
        },
      });
    } catch (err) {
      toast.error("err");
    }
  };

  return (
    <div className="text-black">
      {/* Cover */}
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {user.cover_image_url && !coverError && (
          <img
            src={user.cover_image_url}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={() => setCoverError(true)}
          />
        )}
        {isOwnProfile && (
          <>
            <button
              onClick={() => coverInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <Camera className="text-white w-5 h-5" />
            </button>
            <input
              type="file"
              accept="image/jpeg"
              className="hidden"
              ref={coverInputRef}
              onChange={handleCoverChange}
            />
          </>
        )}
      </div>

      {/* Profile */}
      <div className="relative w-24 h-24 -mt-12 ml-6">
        <img
          src={
            avatarError || !user.profile_image_url
              ? "/no_profile.png"
              : user.profile_image_url
          }
          onError={() => setAvatarError(true)}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-24 h-24 rounded-full border-4 border-black object-cover"
        />
        {isOwnProfile && (
          <>
            <button
              onClick={() => avatarInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 hover:bg-gray-800"
            >
              <Camera className="text-white w-4 h-4" />
            </button>
            <input
              type="file"
              accept="image/jpeg"
              className="hidden"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
            />
          </>
        )}
      </div>

      {/* User Info */}
      <div className="mt-4 ml-6 mb-10">
        <h1 className="text-2xl font-bold text-black">
          {user.first_name} {user.last_name}
        </h1>
        <p className="text-gray-600">@{user.username}</p>
      </div>

      {/* articles */}
      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} type={"noAvatar"} />
        ))}
      </div>

      {/* Cropper Modal */}
      {cropModal && (
        <ImageCropperModal
          imageSrc={cropModal.src}
          aspect={cropModal.aspect}
          onCancel={() => setCropModal(null)}
          onComplete={cropModal.onComplete}
        />
      )}
    </div>
  );
}
