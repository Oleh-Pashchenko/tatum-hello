import preactLogo from '../../assets/tatum.jpeg';
import Form from './form';

export function Home() {
	return (
		<div className="home">
			<a href="https://tatum.io/" target="_blank" rel="noopener noreferrer">
				<img src={preactLogo} alt="Preact logo" height={160} width={160} />
			</a>
			<h1>Tatum Hello</h1>
			<Form />
		</div>
	);
}
