-- Create Form Questions table
-- This table stores the customizable questions for the branding form

DROP TABLE IF EXISTS public.form_questions CASCADE;

CREATE TABLE public.form_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Question details
  step_number INTEGER NOT NULL, -- Which step (1-7)
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL, -- 'text', 'textarea', 'radio', 'checkbox', 'slider', 'select'
  placeholder TEXT,
  helper_text TEXT,
  
  -- Options (for radio, checkbox, select)
  options JSONB, -- Array of options: [{ value: 'opt1', label: 'Option 1' }]
  
  -- Validation
  is_required BOOLEAN DEFAULT false,
  min_length INTEGER,
  max_length INTEGER,
  
  -- Field mapping (which database column this maps to)
  field_name TEXT NOT NULL, -- e.g., 'brand_goal', 'target_audience', etc.
  
  -- Display order and visibility
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  
  -- Meta
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.form_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read (anyone can see questions)
CREATE POLICY "form_questions_public_read" ON public.form_questions 
  FOR SELECT 
  USING (is_active = true);

-- Policy: Only authenticated users (admin) can insert
CREATE POLICY "form_questions_admin_insert" ON public.form_questions 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admin) can update
CREATE POLICY "form_questions_admin_update" ON public.form_questions 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can delete
CREATE POLICY "form_questions_admin_delete" ON public.form_questions 
  FOR DELETE 
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX idx_form_questions_step ON public.form_questions(step_number, display_order);
CREATE INDEX idx_form_questions_active ON public.form_questions(is_active);

-- Add comment
COMMENT ON TABLE public.form_questions IS 'Stores customizable questions for the branding form wizard';

-- Insert default questions
INSERT INTO public.form_questions (step_number, question_text, question_type, field_name, display_order, helper_text) VALUES
  -- Step 1
  (1, '¿En qué etapa está tu proyecto?', 'radio', 'current_stage', 1, 'Opcional · Nos ayuda a entender tu contexto'),
  (1, 'Cuéntanos brevemente qué te gustaría lograr con esta marca', 'textarea', 'brand_goal', 2, 'Opcional · Por ejemplo: "Quiero transmitir confianza y profesionalismo"'),
  (1, '¿Qué problema resuelve tu marca o proyecto?', 'textarea', 'problem_solving', 3, 'Opcional · Ayuda a definir tu propuesta de valor'),
  (1, '¿Hay algo que te frustre de tu imagen actual o de cómo te ves hoy?', 'textarea', 'current_frustrations', 4, 'Opcional · Por ejemplo: "No me siento representado", "Se ve anticuado"'),
  
  -- Step 2
  (2, '¿Con cuál de estas palabras te identificas?', 'checkbox', 'brand_descriptors', 1, 'Opcional · Puedes elegir varias o ninguna'),
  (2, '¿Hay marcas que te gusten y quieras tomar como referencia?', 'textarea', 'like_brands', 2, 'Opcional · Puedes mencionar marcas de cualquier industria'),
  (2, '¿Hay marcas que definitivamente NO quieres parecerte?', 'textarea', 'dislike_brands', 3, 'Opcional · Esto también nos ayuda a entender tu dirección');
