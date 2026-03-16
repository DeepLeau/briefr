import { NextRequest, NextResponse } from 'next/server'
import { getBriefById } from '@/lib/mock/briefs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const brief = getBriefById(id)

  if (!brief) {
    return NextResponse.json(
      { error: 'Brief non trouvé' },
      { status: 404 }
    )
  }

  return NextResponse.json(brief)
}
