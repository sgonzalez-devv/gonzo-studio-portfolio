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
INSERT INTO public.form_questions (step_number, question_text, question_type, field_name, display_order, helper_text, placeholder) VALUES
  -- Step 1: Starting Point
  (1, '¿En qué etapa está tu proyecto?', 'radio', 'current_stage', 1, 'Opcional · Nos ayuda a entender tu contexto', NULL),
  (1, 'Cuéntanos brevemente qué te gustaría lograr con esta marca', 'textarea', 'brand_goal', 2, 'Opcional · Por ejemplo: "Quiero transmitir confianza y profesionalismo"', 'Ej: Quiero que mi marca transmita profesionalismo y cercanía...'),
  (1, '¿Qué problema resuelve tu marca o proyecto?', 'textarea', 'problem_solving', 3, 'Opcional · Ayuda a definir tu propuesta de valor', 'Ej: Ayudo a empresas a digitalizar sus procesos...'),
  (1, '¿Hay algo que te frustre de tu imagen actual o de cómo te ves hoy?', 'textarea', 'current_frustrations', 4, 'Opcional · Por ejemplo: "No me siento representado", "Se ve anticuado"', 'Ej: No me gusta que se vea poco profesional...'),
  
  -- Step 2: Personality
  (2, '¿Con cuál de estas palabras te identificas?', 'checkbox', 'brand_descriptors', 1, 'Opcional · Puedes elegir varias o ninguna', NULL),
  (2, 'Escalas de tono de la marca', 'slider', 'tone_scales', 2, 'Opcional · Desliza para definir el tono de tu marca', NULL),
  (2, '¿Hay marcas que te gusten y quieras tomar como referencia?', 'textarea', 'like_brands', 3, 'Opcional · Puedes mencionar marcas de cualquier industria', 'Ej: Apple, Airbnb, Patagonia...'),
  (2, '¿Hay marcas que definitivamente NO quieres parecerte?', 'textarea', 'dislike_brands', 4, 'Opcional · Esto también nos ayuda a entender tu dirección', 'Ej: Marcas muy corporativas, muy juveniles...'),
  
  -- Step 3: Name & Basics
  (3, '¿Ya tienes un nombre para tu marca?', 'text', 'brand_name', 1, 'Opcional · Si aún no tienes, podemos ayudarte a definirlo', 'Ej: Mi Empresa S.A.'),
  (3, '¿Tienes un slogan o frase distintiva?', 'text', 'slogan', 2, 'Opcional · Una frase que resuma tu propuesta', 'Ej: Innovación que transforma'),
  (3, '¿Has pensado en dominios o redes sociales?', 'textarea', 'domains', 3, 'Opcional · Anota los que ya tienes o los que quisieras', 'Ej: miempresa.com, @miempresa'),
  (3, '¿Qué tipo de nombre prefieres?', 'radio', 'name_type', 4, 'Opcional · Esto nos ayuda si necesitamos sugerir opciones', NULL),
  
  -- Step 4: Audience & Market
  (4, '¿Quién es tu audiencia objetivo?', 'textarea', 'target_audience', 1, 'Opcional · Describe a quién le hablas', 'Ej: Empresarios de 30-50 años en tecnología...'),
  (4, '¿En qué mercado o industria operas?', 'textarea', 'market', 2, 'Opcional · Tu sector o nicho', 'Ej: Consultoría tecnológica, E-commerce...'),
  (4, '¿Qué tipo de negocio tienes?', 'checkbox', 'business_type', 3, 'Opcional · Puedes elegir varios', NULL),
  
  -- Step 5: Brand Contexts
  (5, '¿Dónde se va a usar tu marca?', 'checkbox', 'contexts', 1, 'Opcional · Selecciona todos los que apliquen', NULL),
  (5, 'Detalles adicionales sobre contextos', 'text', 'context_details', 2, 'Opcional · Si quieres agregar algo sobre dónde usarás la marca', 'Ej: Principalmente Instagram y website...'),
  
  -- Step 6: Branding Depth
  (6, '¿Qué nivel de branding necesitas?', 'radio', 'branding_level', 1, 'Opcional · No te preocupes si no estás seguro', NULL),
  (6, '¿Tienes algún deadline aproximado?', 'text', 'deadline', 2, 'Opcional · Puede ser una fecha o algo como "en 2 meses"', 'Ej: Finales de marzo, en 3 meses, no tengo prisa...'),
  (6, '¿Tienes un rango de presupuesto en mente?', 'radio', 'budget_range', 3, 'Opcional · Esto nos ayuda a proponer opciones realistas', NULL),
  
  -- Step 7: Final Details
  (7, '¿Hay restricciones que debamos saber?', 'textarea', 'restrictions', 1, 'Opcional · Cosas que NO quieres o que debes evitar', 'Ej: Nada de verde, evitar símbolos muy geométricos...'),
  (7, '¿Hay referencias visuales, ideas o archivos que quieras compartir?', 'textarea', 'brand_references', 2, 'Opcional · Links, imágenes, moodboards, cualquier cosa que ayude', 'Pega aquí links, describe ideas visuales...'),
  (7, '¿Hay algo más que creas importante y no te preguntamos?', 'textarea', 'additional_notes', 3, 'Opcional · Cualquier cosa que quieras que sepamos', 'Comparte cualquier cosa que consideres relevante...'),
  (7, '¿Cuál es tu email de contacto?', 'text', 'user_email', 4, 'Opcional · Para poder responderte', 'tu@email.com');
