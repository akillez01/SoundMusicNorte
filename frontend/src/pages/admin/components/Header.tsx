import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<Link to='/' className='rounded-lg'>
					<img src='/guitar.png' className='size-10 text-black' />
				</Link>
				<div>
					<h1 className='text-3xl font-bold'>Gerente de Música</h1>
					<p className='text-zinc-400 mt-1'>Gerencie seu catálogo de músicas</p>
				</div>
			</div>
			<UserButton />
		</div>
	);
};
export default Header;
