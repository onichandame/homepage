import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getLocaleFromReq, Translation, translations } from "~/translation";
import { useEffect, useRef } from "react";
import { getIntroduction } from "~/state/introduction";

type LoaderData = { translation: Translation, introduction: string }

const socialLinks = {
  linkedIn: 'https://www.linkedin.com/in/xiao-zhang-a79237169/',
  github: 'https://github.com/onichandame',
  email: 'zxinmyth@gmail.com',
}

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocaleFromReq(request)
  const translation = translations[locale]
  const introduction = await getIntroduction(locale)
  return { translation, introduction };
}

export default function Index() {
  const { translation, introduction } = useLoaderData<LoaderData>()
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      // Card tilt effect
      cardRef.current.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;

      // Shadow movement
      cardRef.current.style.boxShadow = `${x * 20}px ${y * 20}px 40px rgba(0, 0, 0, 0.15)`;

      // Image floating effect
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        cardRef.current.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.1)';
      }
      if (imgRef.current) {
        imgRef.current.style.transform = 'translate(0, 0)';
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-200">
      <div
        ref={cardRef}
        className="flex flex-col items-center w-full max-w-6xl bg-white rounded-xl shadow-xl p-12 md:flex-row md:text-left transition-all duration-300 ease-out hover:shadow-2xl relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 mix-blend-multiply animate-[blob_7s_infinite_2s]" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-100 rounded-full opacity-20 mix-blend-multiply animate-[blob_7s_infinite_4s]" />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-20 mix-blend-multiply animate-[blob_7s_infinite]" />
        </div>

        <div className="relative mb-8 md:mr-12 md:mb-0">
          <div className="relative group">
            <img
              ref={imgRef}
              src={"https://res.cloudinary.com/onichandame/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1747296851/mmexport1728029668566_cropped_y57sqr.png"}
              alt={`${translation.name}'s profile`}
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg md:w-48 md:h-48 transition-transform duration-300 ease-out z-10 relative group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-avatar.png';
              }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10" />
          </div>
        </div>

        <div className="relative max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-500">
            {translation.name}
          </h1>
          <h2 className="text-xl text-gray-500 font-medium mb-6 hover:text-gray-700 transition-colors duration-300">
            {translation.title}
          </h2>

          <div className="prose prose-lg text-gray-600 leading-relaxed mb-8 hover:text-gray-800 transition-colors duration-300">
            {introduction}
          </div>

          <div className="flex justify-center space-x-6 md:justify-start">
            {socialLinks.linkedIn && (
              <a
                href={socialLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin" />
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <i className="fab fa-github" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-2xl text-gray-700 hover:text-red-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="Email"
              >
                <i className="fas fa-envelope" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}