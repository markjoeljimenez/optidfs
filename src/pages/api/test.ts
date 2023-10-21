import { XMLParser } from 'fast-xml-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
	const token = await getToken({ req });

	const response = await fetch(
		`https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games`,
		{
			headers: { Authorization: `Bearer ${token?.accessToken}` },
		}
	);

	res.status(200).json(new XMLParser().parse(await response.text()));
}
