USE [Sstrategy]
GO
/****** Object:  Table [dbo].[admin]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NULL,
	[apellido] [varchar](255) NULL,
	[nombre_usuario] [nvarchar](50) NOT NULL,
	[password] [varchar](255) NULL,
	[email] [nvarchar](100) NOT NULL,
	[telefono] [varchar](255) NULL,
	[telefono_movil] [varchar](255) NULL,
	[domicilio] [nvarchar](255) NULL,
	[ciudad] [varchar](255) NULL,
	[estado] [varchar](255) NULL,
	[codigo_postal] [varchar](255) NULL,
	[notas] [varchar](255) NULL,
	[calendario] [nvarchar](50) NULL,
	[idioma] [nvarchar](50) NULL,
	[zona_horaria] [nvarchar](50) NULL,
	[recibir_notificaciones] [bit] NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[appointments]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[appointments](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[client_id] [bigint] NOT NULL,
	[date] [varchar](255) NULL,
	[time] [varchar](255) NULL,
	[timezone] [varchar](255) NULL,
	[service] [bigint] NULL,
	[notes] [varchar](255) NULL,
	[status] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[categoria_servicio]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categoria_servicio](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[descripcion] [nvarchar](max) NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[clients]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[clients](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
	[address] [varchar](255) NULL,
	[city] [varchar](255) NULL,
	[postal_code] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[coches]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[coches](
	[matricula] [varchar](50) NOT NULL,
	[color] [varchar](255) NULL,
	[marca] [varchar](255) NULL,
	[nombre] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[matricula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[configuracion]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[configuracion](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[nombre_empresa] [nvarchar](255) NULL,
	[email_empresa] [nvarchar](255) NULL,
	[enlace_empresa] [nvarchar](255) NULL,
	[logotipo_url] [nvarchar](255) NULL,
	[color_corporativo] [nvarchar](7) NULL,
	[tema] [nvarchar](50) NULL,
	[formato_fecha] [nvarchar](10) NULL,
	[primer_dia_semana] [nvarchar](10) NULL,
	[idioma_predeterminado] [nvarchar](50) NULL,
	[zona_horaria_predeterminada] [nvarchar](50) NULL,
	[version] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[proveedor]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[proveedor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NULL,
	[apellido] [varchar](255) NULL,
	[nombre_usuario] [nvarchar](50) NOT NULL,
	[password] [varbinary](255) NULL,
	[email] [nvarchar](100) NOT NULL,
	[telefono] [varchar](255) NULL,
	[telefono_movil] [varchar](255) NULL,
	[domicilio] [nvarchar](255) NULL,
	[ciudad] [varchar](255) NULL,
	[estado] [varchar](255) NULL,
	[codigo_postal] [varchar](255) NULL,
	[notas] [varchar](255) NULL,
	[calendario] [nvarchar](50) NULL,
	[idioma] [nvarchar](50) NULL,
	[zona_horaria] [nvarchar](50) NULL,
	[recibir_notificaciones] [bit] NULL,
	[ocultar_publico] [bit] NULL,
	[servicio_id] [int] NOT NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[secretario]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[secretario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NULL,
	[apellido] [varchar](255) NULL,
	[nombre_usuario] [nvarchar](50) NOT NULL,
	[password] [varbinary](255) NULL,
	[email] [nvarchar](100) NOT NULL,
	[telefono] [varchar](255) NULL,
	[telefono_movil] [varchar](255) NULL,
	[domicilio] [nvarchar](255) NULL,
	[ciudad] [varchar](255) NULL,
	[estado] [varchar](255) NULL,
	[codigo_postal] [varchar](255) NULL,
	[notas] [varchar](255) NULL,
	[calendario] [nvarchar](50) NULL,
	[idioma] [nvarchar](50) NULL,
	[zona_horaria] [nvarchar](50) NULL,
	[recibir_notificaciones] [bit] NULL,
	[proveedor_id] [int] NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[servicio]    Script Date: 05/06/2025 10:02:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[servicio](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NULL,
	[duracion_minutos] [int] NOT NULL,
	[precio] [numeric](38, 2) NULL,
	[moneda] [nvarchar](10) NULL,
	[categoria_id] [varchar](255) NULL,
	[tipos_disponibles] [nvarchar](50) NULL,
	[numero_asistentes] [int] NULL,
	[ubicacion] [nvarchar](255) NULL,
	[color] [nvarchar](20) NULL,
	[ocultar_publico] [bit] NULL,
	[descripcion] [varchar](255) NULL,
	[fecha_creacion] [datetime] NULL,
	[is_selected] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[admin] ADD  DEFAULT ('Predeterminado') FOR [calendario]
GO
ALTER TABLE [dbo].[admin] ADD  DEFAULT ('Spanish') FOR [idioma]
GO
ALTER TABLE [dbo].[admin] ADD  DEFAULT ('UTC') FOR [zona_horaria]
GO
ALTER TABLE [dbo].[admin] ADD  DEFAULT ((1)) FOR [recibir_notificaciones]
GO
ALTER TABLE [dbo].[admin] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[categoria_servicio] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[configuracion] ADD  DEFAULT ((0)) FOR [version]
GO
ALTER TABLE [dbo].[proveedor] ADD  DEFAULT ('Predeterminado') FOR [calendario]
GO
ALTER TABLE [dbo].[proveedor] ADD  DEFAULT ('Spanish') FOR [idioma]
GO
ALTER TABLE [dbo].[proveedor] ADD  DEFAULT ('UTC') FOR [zona_horaria]
GO
ALTER TABLE [dbo].[proveedor] ADD  DEFAULT ((1)) FOR [recibir_notificaciones]
GO
ALTER TABLE [dbo].[proveedor] ADD  DEFAULT ((0)) FOR [ocultar_publico]
GO
ALTER TABLE [dbo].[proveedor] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[secretario] ADD  DEFAULT ('Predeterminado') FOR [calendario]
GO
ALTER TABLE [dbo].[secretario] ADD  DEFAULT ('English') FOR [idioma]
GO
ALTER TABLE [dbo].[secretario] ADD  DEFAULT ('UTC') FOR [zona_horaria]
GO
ALTER TABLE [dbo].[secretario] ADD  DEFAULT ((1)) FOR [recibir_notificaciones]
GO
ALTER TABLE [dbo].[secretario] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[servicio] ADD  CONSTRAINT [DF__servicio__precio__DEFAULT]  DEFAULT ((0.00)) FOR [precio]
GO
ALTER TABLE [dbo].[servicio] ADD  DEFAULT ('USD') FOR [moneda]
GO
ALTER TABLE [dbo].[servicio] ADD  DEFAULT ('Flexible') FOR [tipos_disponibles]
GO
ALTER TABLE [dbo].[servicio] ADD  DEFAULT ((1)) FOR [numero_asistentes]
GO
ALTER TABLE [dbo].[servicio] ADD  DEFAULT ('#FFFFFF') FOR [color]
GO
ALTER TABLE [dbo].[servicio] ADD  DEFAULT ((0)) FOR [ocultar_publico]
GO
ALTER TABLE [dbo].[servicio] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[appointments]  WITH CHECK ADD FOREIGN KEY([client_id])
REFERENCES [dbo].[clients] ([id])
GO
ALTER TABLE [dbo].[proveedor]  WITH CHECK ADD FOREIGN KEY([servicio_id])
REFERENCES [dbo].[servicio] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[secretario]  WITH CHECK ADD FOREIGN KEY([proveedor_id])
REFERENCES [dbo].[proveedor] ([id])
ON DELETE CASCADE
GO
