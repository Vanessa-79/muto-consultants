export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          description: string;
          requirements: string;
          salary_range: string | null;
          type: string;
          created_at: string;
          deadline: string;
          status: string;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          location: string;
          description: string;
          requirements: string;
          salary_range?: string | null;
          type: string;
          created_at?: string;
          deadline: string;
          status?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          location?: string;
          description?: string;
          requirements?: string;
          salary_range?: string | null;
          type?: string;
          created_at?: string;
          deadline?: string;
          status?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          user_id: string;
          status: string;
          created_at: string;
          resume_url: string | null;
          cover_letter: string | null;
        };
        Insert: {
          id?: string;
          job_id: string;
          user_id: string;
          status?: string;
          created_at?: string;
          resume_url?: string | null;
          cover_letter?: string | null;
        };
        Update: {
          id?: string;
          job_id?: string;
          user_id?: string;
          status?: string;
          created_at?: string;
          resume_url?: string | null;
          cover_letter?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          phone: string | null;
          location: string | null;
          bio: string | null;
          skills: string[] | null;
          experience: Json;
          education: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          experience?: Json;
          education?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          location?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          experience?: Json;
          education?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}