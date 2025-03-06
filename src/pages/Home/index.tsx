import preactLogo from '../../assets/tatum.jpeg'
import Form from './form';

export function Home() {
	return (
		<div class="home">
			<a href="https://tatum.io/" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>Tatum Hello</h1>
			<Form />
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
