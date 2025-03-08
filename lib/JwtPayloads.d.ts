import { JwtPayload } from 'jwt-decode'

interface JwtPayloadWithExp extends JwtPayload { exp: number }
interface JwtPayloadWithId extends JwtPayload { user_id: number }
