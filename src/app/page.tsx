
import Link from 'next/link';

const MainPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Crypto Rates Dashboard</h1>
      <div>
        <h2 className="text-xl">Navigate to:</h2>
        <ul>
          <li>
            <Link href="/pairs" className="text-blue-500">
              Manage Crypto Pairs
            </Link>
          </li>
          <li>
            <Link href="/analytics" className="text-blue-500">
              View Analytics
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
