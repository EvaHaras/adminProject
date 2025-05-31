

import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import axios from 'axios';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signIn = async (request: NextRequest) => {
  const { email, password } = schema.parse(await request.json());
  const response = await axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    data: {
      "email": email,
      "password": password
    }
  });

  const cookieStore = cookies();
  (await cookieStore).set('token', response.data.accessToken)

  return NextResponse.json('session', { status: 200 });
};


export { signIn as POST }