export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Posts: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          description: string | null
          id: number
          is_draft: boolean
          is_private: boolean | null
          title: string
        }
        Insert: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_draft?: boolean
          is_private?: boolean | null
          title?: string
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          description?: string | null
          id?: number
          is_draft?: boolean
          is_private?: boolean | null
          title?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
