import { Analytics } from '@vercel/analytics/react';

export default function Home() {
return (
<>
<Head>
<title></title>
</Head>
<Provider theme={defaultTheme}>
<View>
<Header></Header>
<Content></Content>
<Footer> </Footer>
</View>
</Provider>
<Analytics /> 
</>
);
}