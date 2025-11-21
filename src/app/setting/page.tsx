import { ProfileSection, UserInfoSection } from "@/features";

export default function SettingPage() {
  return (
    <div className='flex w-full max-w-4xl flex-col gap-8 px-5 py-10'>
      <h1 className='text-2xl font-bold text-white'>프로필 설정</h1>

      <div className='flex flex-col gap-8 md:flex-row md:items-start'>
        <ProfileSection />
        <UserInfoSection />
      </div>
    </div>
  );
}
