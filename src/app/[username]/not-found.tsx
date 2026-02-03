import Link from "next/link";
import { FaHome, FaSearch, FaUserSlash } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full mb-6">
            <FaUserSlash className="text-4xl text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The portfolio you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaHome />
            Go Home
          </Link>
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaSearch />
            Create Your Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
