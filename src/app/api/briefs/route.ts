import { NextRequest, NextResponse } from 'next/server'
import { getBriefs, getBriefsFiltered } from '@/lib/mock/briefs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const source = searchParams.get('source')

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return NextResponse.json(
      { error: 'Paramètres invalides' },
      { status: 400 }
    )
  }

  const allBriefs = source && source !== 'all' 
    ? getBriefsFiltered(source as 'Email' | 'Slack' | 'Meeting')
    : getBriefs()

  const total = allBriefs.length
  const totalPages = Math.ceil(total / limit)
  const briefs = allBriefs.slice((page - 1) * limit, page * limit)

  return NextResponse.json({
    briefs,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  })
}
