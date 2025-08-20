import ShadowPink from "../../atoms/shadow-pink";
import FormBGShadow from "../../atoms/FormBGShadow";
import BottomShadow from "../../atoms/BottomShadow";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<ShadowPink />
			<div className="w-full px-10 flex items-center justify-evenly">
				<FormBGShadow />
				<BottomShadow />

				{/* Left side - Form */}
				{children}

				{/* Right side - Logo and 3D Graphic */}
				<div className="hidden lg:flex flex-col items-center justify-center w-full max-w-2xl">
					<div className="mb-8">
						<div className="relative flex flex-col gap-1 justify-center items-center">
							<img
								className="w-full h-full"
								alt="3D Graphic"
								src="/image.png"
							/>
							<img
								className="max-w-[413px] w-full h-[75px] absolute left-2/4 transform -translate-x-1/2 bottom-0"
								alt="Logo"
								src="/logoText.png"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
