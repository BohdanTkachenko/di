const classes = [];

function getClass(cls) {
  return classes.find(item => item.cls === cls);
}

function annotate(cls, dependencies) {
  const existing = getClass(cls);
  if (existing) {
    throw new Error(`Class ${cls.name} is already registered.`);
  }

  classes.push({
    cls,
    instance: null,
    dependencies: Array.isArray(dependencies) ? dependencies : [],
  });

  return cls;
}

function get(cls) {
  const existing = getClass(cls);
  if (!existing) {
    throw new Error(`Class ${cls} is not registered.`);
  }

  if (existing.instance === null) {
    const deps = existing.dependencies.map(depCls => get(depCls));
    existing.instance = new existing.cls(...deps); // eslint-disable-line new-cap
  }

  return existing.instance;
}

function getAnnotated(cls, deps) {
  annotate(cls, deps);
  return get(cls);
}

module.exports = {
  annotate,
  get,
  getAnnotated,
};
