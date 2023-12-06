export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      backgrounds: {
        Row: {
          end_date: string | null
          id: string
          name: string
          school_code: string | null
          start_date: string
          user_id: string
        }
        Insert: {
          end_date?: string | null
          id?: string
          name: string
          school_code?: string | null
          start_date: string
          user_id: string
        }
        Update: {
          end_date?: string | null
          id?: string
          name?: string
          school_code?: string | null
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "backgrounds_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_details: {
        Row: {
          date_of_birth: string | null
          gender: string | null
          id: string
          name: string | null
          profile_icon_path: string | null
          terms_agreed: boolean | null
        }
        Insert: {
          date_of_birth?: string | null
          gender?: string | null
          id: string
          name?: string | null
          profile_icon_path?: string | null
          terms_agreed?: boolean | null
        }
        Update: {
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          profile_icon_path?: string | null
          terms_agreed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_details_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

